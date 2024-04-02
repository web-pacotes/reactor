<script generics="E,S" lang="ts">
	/* eslint-disable no-undef  */

	import { onMount } from 'svelte';
	import { type Reactor } from './reactor.js';
	import { resolve } from './provider.js';

	/**
	 * The reactor whose state is being subscribed.
	 */
	export let reactor: Reactor<E, S> | typeof Reactor<E, S>;

	/**
	 * A callback for subscribing to new state changes.
	 */
	export let listener: ((state: S) => void) | undefined = undefined;

	const value = !('caller' in reactor) ? reactor : resolve(reactor);

	// Subscribe only once after element is inserted in the DOM
	if (listener !== undefined) {
		const callback = listener;

		onMount(() => value.subscribe(callback));
	}
</script>

<slot />
