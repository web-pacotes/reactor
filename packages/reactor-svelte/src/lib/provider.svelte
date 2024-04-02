<script generics="E,S" lang="ts">
	/* eslint-disable no-undef  */

	import { provide } from './provider.js';
	import { type Reactor } from './reactor.js';

	/**
	 * The reactor that is being provided to children components.
	 */
	export let reactor: Reactor<E, S>;

	provide(reactor);
</script>

<slot />
