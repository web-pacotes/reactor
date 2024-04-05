<script lang="ts">
	import { CounterReactor } from '$lib';

	const counter = new CounterReactor();
</script>

<h1>reactor-svelte-example</h1>

<div style="display: flex; justify-content: center">
	Counter: {$counter}
	<div style="display: flex; justify-content: space-between;">
		<button on:click={() => counter.add('inc')}>+</button>
		<button on:click={() => counter.add('dec')}>-</button>
	</div>
</div>
