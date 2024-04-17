<script lang="ts">
	import { MultiReactorProvider, resolve } from '../index.js';
	import { CounterReactor } from './counter-reactor.js';
	import { NumberReactor } from './number-reactor.js';
	import AttachDomValueChild from './attach-dom-value.spec.svelte';

	export let key: string;

	const counter = new CounterReactor();
	const number = new NumberReactor();

	const reactors = [counter, number];
</script>

<MultiReactorProvider {reactors}>
	<AttachDomValueChild
		{key}
		callback={() => `${resolve(CounterReactor)}|${resolve(NumberReactor)}`}
	/>
</MultiReactorProvider>
