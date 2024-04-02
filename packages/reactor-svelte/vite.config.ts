import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
	plugins: [svelte()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		environment: 'jsdom',
		// Required to load real onMount implementation
		// https://github.com/vitest-dev/vitest/issues/2834#issuecomment-1439576110
		alias: [
			{ find: /^svelte$/, replacement: 'svelte/internal' }
		]
	}
});
