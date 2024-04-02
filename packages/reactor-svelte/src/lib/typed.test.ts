import { describe, expect, test } from 'vitest';
import { isTypedOf } from './typed.js';

describe('isTypeOf', () => {
	type Color = { hex: string; type: 'red' | 'blue' };

	const red = { hex: '#FF0000', type: 'red' } satisfies Color;
	const blue = { hex: '#0000FF', type: 'blue' } satisfies  Color;

	test('returns true if extracted generic type value matches argument value', () => {
		const match = isTypedOf<Color>(red, 'red');

		expect(match).toBeTruthy();
	});

	test('returns false if extracted generic type value does not match argument value', () => {
		const match = isTypedOf<Color>(blue, 'red');

		expect(match).toBeFalsy();
	});
});
