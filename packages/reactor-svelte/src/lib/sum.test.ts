import sum from './sum.js';
import { expect, test } from 'vitest';

test('adding 40 with 2 equals 42', () => {
	expect(sum(40, 2)).toBe(42);
});
