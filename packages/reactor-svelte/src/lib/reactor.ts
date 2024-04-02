import {
	writable,
	type Invalidator,
	type Subscriber,
	type Unsubscriber,
	type Writable
} from 'svelte/store';

/**
 * A functional interface for emitting values.
 */
interface Emitter<V> {
	emit(value: V): void;
}

/**
 * A {@link Emitter} that emits values to a {@link Writable}.
 */
class WritableEmitter<V> implements Emitter<V> {
	private writable: Writable<V>;

	constructor(writable: Writable<V>) {
		this.writable = writable;
	}

	emit(value: V): void {
		return this.writable.set(value);
	}
}

/**
 * An event stream like reaction engine that propagates events into 0 or more states (1 Event > * State).
 * The API is pretty straight forward:
 * 1. clients register event-state mappers using the {@link on} method inside the constructor
 * 2. clients publish an event using {@link add} method
 * 3. engine transforms these events using the available mappers for the specific event
 * 4. subscribes receive the created states using the {@link subscribe} method
 *
 * ```typescript
 * class AuthReactor extends Reactor<AuthEvent, AuthState> {
 *
 *  constructor() {
 *      super(<NotAuthenticated>{});
 *
 *      super.on<AuthenticationStarted>(
 *          (event, emit) => {
 *              const credentials = Credentials(event.username, event.password);
 *              const authenticated = AuthenticationService.login(credentials);
 *
 *              if(authenticated) {
 *                  emit(AuthenticationSuccessful());
 *              } else {
 *                  emit(AuthenticationFailure());
 *              }
 *          },
 *          (event) => 'password' in event
 *      );
 *  }
 * }
 *
 * const reactor = new AuthReactor()
 * reactor.add(<AuthenticationStarted>{ username: 'reactor', password: 'secret' });
 *
 * const state = $reactor;
 * ```
 *
 * Very inspired from [Flutter Bloc library](https://bloclibrary.dev).
 *
 */
export abstract class Reactor<E, S> {
	private readonly states: Writable<S>;
	private events: Writable<E>;
	private emitter: WritableEmitter<S>;

	/**
	 * The initial reactor state.
	 */
	private readonly initialState: S;

	/**
	 * The current state value.
	 */
	state: S;

	/**
	 * Subscribe property so reactor can behave as a Svelte store.
	 */
	subscribe: (this: void, run: Subscriber<S>, invalidate?: Invalidator<S>) => Unsubscriber;

	protected constructor(initialState: S) {
		this.initialState = initialState;
		this.state = initialState;
		this.states = writable(initialState);
		this.events = writable();
		this.emitter = new WritableEmitter(this.states);
		this.subscribe = this.states.subscribe;
	}

	/**
	 * Publishes a new event to be later processed by subscribers.
	 *
	 * @param event - the event to be published
	 */
	add(event: E) {
		this.events.set(event);
	}

	/**
	 * Registers an event-state mapper.
	 *
	 * @param mapEventToState - a callback that allows clients to access the event being mapped and a function to emit the mapped state.
	 * @param accepts - a predicate function to validate that the event can be processed.
	 */
	on<TE extends E>(
		mapEventToState: (event: TE, emit: (state: S) => void) => void,
		accepts: (event: E) => boolean
	) {
		this.events.subscribe((event) => {
			if (event && accepts(event)) {
				mapEventToState(event as TE, (state) => {
					this.state = state;
					this.emitter.emit(state);
				});
			}
		});
	}

	/**
	 * Resets the reactor back to its initial state.
	 */
	reset() {
		this.state = this.initialState;
		this.emitter.emit(this.state);
	}
}
