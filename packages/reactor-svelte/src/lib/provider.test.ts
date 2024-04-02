import { afterEach, describe, expect, test } from 'vitest';
import { cleanup, configure, render, screen } from '@testing-library/svelte';
import { ParentNotProvidingReactorToChild, ParentProvidingReactorToChild } from './spec/index.js';

describe('provider', () => {
	configure({
		testIdAttribute: 'id'
	});

	afterEach(() => {
		cleanup();
	});

	test('child can access reactor if provided by parent', async () => {
		const key = 'dom-key';

		render(ParentProvidingReactorToChild, { props: { key: key } });
		const domValue = (await screen.findByTestId(key)).innerHTML;

		expect(domValue).not.toBeNull();
	});

	test('child can not access reactor if not provided by parent', async () => {
		const key = 'dom-key';

		render(ParentNotProvidingReactorToChild, { props: { key: key } });
		const domValue = (await screen.findByTestId(key)).innerHTML;

		expect(domValue).toBe('undefined');
	});
});
