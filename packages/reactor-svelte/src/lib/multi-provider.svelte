<script lang="ts">
	import { provide } from './provider.js';
	import { type Reactor } from './reactor.js';

	/**
	 * The reactors that are being provided to children components.
	 */
	/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
	export let reactors: Reactor<NonNullable<any>, NonNullable<any>>[];

	reactors.forEach(provide);
</script>

<slot />
