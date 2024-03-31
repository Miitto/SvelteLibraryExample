<script lang="ts">
	import type { Prisma } from '@prisma/client';
	import Modal from './Modal.svelte';

	let show: boolean = false;

	export let required = false;

	export let books: Prisma.BookGetPayload<{
		include: { author: true };
	}>[] = [];

	$: filtered = books.filter((book) => book.title.toLowerCase().includes(bookSearch.toLowerCase()));

	let value = '';

	let bookSearch = '';

	$: book = books.find((book) => book.id === value);

	$: show && (bookSearch = '');
</script>

<Modal bind:show>
	<h2 slot="header">Select Book</h2>
	<form>
		<input type="text" placeholder="Search for a book..." bind:value={bookSearch} />
	</form>
	<ul class="books">
		{#each filtered as book (book.id)}
			<li class="book">
				<h3>{book.title}</h3>
				<p>{book.author.name}</p>
				<button>Select</button>
			</li>
		{:else}
			<p>No Books Found</p>
		{/each}
	</ul>
</Modal>
<input
	type="text"
	{required}
	placeholder="Select a book..."
	on:click|preventDefault={() => (show = true)}
	value={book?.title ?? ''}
	on:keydown={(evt) => {
		if (evt.key != 'Tab' && evt.key != 'Escape') show = true;
	}}
/>
<input type="text" name="book" hidden bind:value />

<style lang="scss">
	.books {
		display: flex;
		flex-direction: column;
	}
</style>
