import { afterEach, describe, expect, test } from 'vitest';
import { cleanup, configure, render, screen } from '@testing-library/svelte';
import {
	ParentNotProvidingReactorToChild,
	ParentProvidingMultipleParameterConstructorReactorToChild,
	ParentProvidingReactorToChild
} from './spec/index.js';

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

		expect(domValue).not.toBe('undefined');
	});

	test('child can not access reactor if not provided by parent', async () => {
		const key = 'dom-key';

		render(ParentNotProvidingReactorToChild, { props: { key: key } });
		const domValue = (await screen.findByTestId(key)).innerHTML;

		expect(domValue).toBe('undefined');
	});
});

describe('resolve', () => {
	test('is able to resolve multiple parameter constructor reactor', async () => {
		const key = 'dom-key';

		render(ParentProvidingMultipleParameterConstructorReactorToChild, { props: { key: key } });
		const domValue = (await screen.findByTestId(key)).innerHTML;

		expect(domValue).not.toBe('undefined');
	});
});
