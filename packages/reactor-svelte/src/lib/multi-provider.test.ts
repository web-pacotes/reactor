import { afterEach, describe, expect, test } from 'vitest';
import { cleanup, configure, render, screen } from '@testing-library/svelte';
import { ParentProvidingMultipleReactorToChild } from './spec/index.js';

describe('multi-provider', () => {
	configure({
		testIdAttribute: 'id'
	});

	afterEach(() => {
		cleanup();
	});

	test('child can access all reactors provided by parent', async () => {
		const key = 'dom-key';

		render(ParentProvidingMultipleReactorToChild, { props: { key: key } });
		const domValue = (await screen.findByTestId(key)).innerHTML;

		expect(domValue).not.toContain('undefined');
	});
});
