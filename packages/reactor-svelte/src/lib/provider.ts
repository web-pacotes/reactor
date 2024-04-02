import { getContext, setContext } from 'svelte';
import type { Reactor } from './reactor.js';

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
export function resolve<E, S>(type: typeof Reactor<E, S>) {
	return getContext<Reactor<E, S>>(type);
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
