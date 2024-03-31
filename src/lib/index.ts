// place files you want to import through the `$lib` alias in this folder.

import { writable } from 'svelte/store';

export const title = writable('Library');

export function formatDate(date: Date) {
	return date.toLocaleDateString('en-GB', {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
		weekday: 'short'
	});
}
