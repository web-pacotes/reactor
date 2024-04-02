<script lang="ts">
	import { resolve } from '../index.js';
	import { CounterReactor } from './counter-reactor.js';
	import AttachDomValueChild from './attach-dom-value.spec.svelte';

	export let key: string;
</script>

<AttachDomValueChild {key} callback={() => resolve(CounterReactor)} />
