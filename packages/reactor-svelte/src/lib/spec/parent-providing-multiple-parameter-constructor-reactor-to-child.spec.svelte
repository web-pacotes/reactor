<script lang="ts">
	import { ReactorListener, ReactorProvider, resolve } from '../index.js';
	import AttachDomValueChild from './attach-dom-value.spec.svelte';
	import { MultipleParameterConstructorReactor } from './multiple-parameter-constructor-reactor.js';

	export let key: string;

	const reactor = new MultipleParameterConstructorReactor(0, 1);
</script>

<ReactorProvider {reactor}>
	<AttachDomValueChild {key} callback={() => resolve(MultipleParameterConstructorReactor)} />
</ReactorProvider>

<ReactorListener reactor={MultipleParameterConstructorReactor} />
