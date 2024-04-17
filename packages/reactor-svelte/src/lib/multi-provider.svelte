<script lang="ts">
	import { provide } from './provider.js';
	import { type Reactor } from './reactor.js';

	/**
	 * The reactors that are being provided to children components.
	 */
	export let reactors: Reactor<never, never>[];

	reactors.forEach(provide);
</script>

<slot />
