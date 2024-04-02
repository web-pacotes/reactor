import { afterEach, describe, expect, test, vitest } from 'vitest';
import { cleanup, configure, render } from '@testing-library/svelte';
import { ReactorListener } from './index.js';
import { CounterReactor } from './spec/counter-reactor.js';

describe('reactor', () => {
	configure({
		testIdAttribute: 'id'
	});

	afterEach(() => {
		vitest.clearAllMocks();
		cleanup();
	});

	test('resolves nearest reactor if an instance is not provided', async () => {
		const reactor = CounterReactor;

		vitest.mock('./provider.js');
		const provider = await import('./provider.js');
		provider.resolve = vitest.fn();

		// @ts-expect-error ignore generics check
		render(ReactorListener, { props: { reactor: reactor } });

		expect(provider.resolve).toBeCalled();
	});

	test('does not resolve nearest reactor if an instance is provided', async () => {
		const reactor = new CounterReactor();

		vitest.mock('./provider.js');
		const provider = await import('./provider.js');
		provider.resolve = vitest.fn();

		// @ts-expect-error ignore generics check
		render(ReactorListener, { props: { reactor: reactor } });

		expect(provider.resolve).not.toBeCalled();
	});

	test('subscribes to listener callback if provided', async () => {
		const reactor = new CounterReactor();
		vitest.spyOn(reactor, 'subscribe');

		render(ReactorListener, {
			props: {
				// @ts-expect-error ignore generics check
				reactor: reactor, listener: () => {
				}
			}
		});

		expect(reactor.subscribe).toBeCalled();
	});

	test('does not subscribe to listener callback if not provided', async () => {
		const reactor = new CounterReactor();
		vitest.spyOn(reactor, 'subscribe');

		// @ts-expect-error ignore generics check
		render(ReactorListener, { props: { reactor: reactor } });

		expect(reactor.subscribe).not.toBeCalled();
	});
});
