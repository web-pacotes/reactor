import { getContext, setContext } from 'svelte';
import type { Reactor } from './reactor.js';
import type { TypedClass } from './typed.js';

/**
 * Resolves a {@link Reactor} instance that has been provided by the parent component
 * using the {@link provide} function.
 *
 * ```typescript
 * resolve(AuthReactor) // returns instance of AuthReactor if provided by parent component.
 * ```
 *
 * @param type - prototype of the subclass that extends {@link Reactor}.
 */
export function resolve<T>(type: TypedClass<T>) {
	return getContext<T>(type);
}

/**
 * Provides a {@link Reactor} instance to children components of the
 * component where the function is called.
 *
 * Must be called during the component initialization.
 *
 * @param value - the reactor instance to provide.
 */
export function provide<E, S>(value: Reactor<E, S>) {
	return setContext(value.constructor, value);
}
