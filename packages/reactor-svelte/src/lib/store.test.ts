import { describe, expect, test, vitest } from 'vitest';
import { allowDuplicatesStore } from './store.js';

describe('allowDuplicatesStore', () => {
	test('emits value if the previous is a different value', () => {
		const store = allowDuplicatesStore(0);
		const mockSubscribe = vitest.fn<number[], void>();
		const value = 1;

		store.subscribe(mockSubscribe);
		store.set(value);

		expect(mockSubscribe).toBeCalledWith(value);
	});

	test('emits value if the previous is the same value', () => {
		const store = allowDuplicatesStore(0);
		const mockSubscribe = vitest.fn<number[], void>();
		const value = 1;

		store.subscribe(mockSubscribe);
		store.set(value);
		store.set(value);

		expect(mockSubscribe).toHaveBeenLastCalledWith(value);
		expect(mockSubscribe).toBeCalledTimes(3);
	});
});
