<script generics="T" lang="ts">
	/* eslint-disable no-undef  */

	export let key: string;
	export let callback: () => T;

	const value = callback();
</script>

<div id="{key}">{value}</div>