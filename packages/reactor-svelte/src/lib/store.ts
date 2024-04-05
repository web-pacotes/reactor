import { writable } from 'svelte/store';

/**
 * Creates a new svelte {@link writable} store that allows emiting duplicate values.
 *
 * @returns a {@link writable} store that doesn't check if the previous element is the same as the emiting one.
 */
export function allowDuplicatesStore<T>(initial: T | undefined = undefined) {
	const { update, subscribe } = writable<{ value: T | undefined; inc: number }>({
		value: initial,
		inc: 0
	});

	return {
		set: (value: T) =>
			update((v) => {
				return {
					value: value,
					inc: v.inc + 1
				};
			}),
		update: (updater: (value: T) => T) =>
			update((v) => {
				return {
					value: updater(v.value!),
					inc: v.inc + 1
				};
			}),
		subscribe: (callback: (value: T) => void) => subscribe((event) => callback(event.value!))
	};
}
