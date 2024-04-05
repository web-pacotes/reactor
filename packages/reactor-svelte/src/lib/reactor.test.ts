import { afterEach, describe, expect, test, vitest } from 'vitest';
import { cleanup, configure, render } from '@testing-library/svelte';
import { ReactorListener } from './index.js';
import { CounterReactor } from './spec/counter-reactor.js';
import { NumberReactor } from './spec/number-reactor.js';

describe('reactor', () => {
	describe('listener', () => {
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
					reactor: reactor,
					listener: () => {}
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

	describe('on', () => {
		describe('only emits state if event is accepted', () => {
			const reactor = new NumberReactor();
			const dispatch = 1;

			reactor.on(
				(event, emit) => emit(event + 1),
				(event) => event > 0
			);

			test('emits if event is > 0', () => {
				const expected = dispatch + 1;

				reactor.add(dispatch);

				expect(reactor.state).toBe(expected);
			});

			test('does not emit if event is not > 0', () => {
				const expected = reactor.state;

				reactor.add(dispatch);

				expect(reactor.state).toBe(expected);
			});

			test('allows duplicate events', () => {
				const reactor = new CounterReactor();
				const mockSubscribe = vitest.fn<number[], void>();

				reactor.subscribe(mockSubscribe);
				reactor.add('inc');
				reactor.add('inc');

				expect(mockSubscribe).toBeCalledTimes(3);
			});
		});
	});
});
