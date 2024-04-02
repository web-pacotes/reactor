<script lang="ts">
	import { ReactorProvider, resolve } from '../index.js';
	import { CounterReactor } from './counter-reactor.js';
	import AttachDomValueChild from './attach-dom-value.spec.svelte';

	export let key: string;

	const reactor = new CounterReactor();
</script>

<ReactorProvider {reactor}>
	<AttachDomValueChild {key} callback={() => resolve(CounterReactor)} />
</ReactorProvider>
