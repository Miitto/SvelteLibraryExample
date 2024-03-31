<script lang="ts">
	import Modal from '$lib/Components/Modal.svelte';
	import type { PageServerData } from './$types';
	import AuthorSelect from '$lib/Components/AuthorSelect.svelte';
	import { onMount } from 'svelte';
	import { title } from '$lib';
	import { enhance } from '$app/forms';

	export let data: PageServerData;

	onMount(() => {
		title.set('Books');
	});

	let showNewBook = false;
</script>

<div class="wrapper">
	<h2>Books</h2>
	<ul>
		{#each data.books as book (book.id)}
			<li class="book">
				<h2>{book.title}</h2>
				<p>{book.author.name}</p>
				<small>{book.description}</small>
			</li>
		{:else}
			<p>No books</p>
		{/each}
	</ul>
</div>
<button class="new" on:click={() => (showNewBook = true)}> + </button>
<Modal bind:show={showNewBook}>
	<h2 slot="header">New Book</h2>
	<form class="modal" use:enhance method="POST" on:submit={() => (showNewBook = false)}>
		<label for="book">Title</label>
		<input type="text" name="title" required placeholder="Title..." />
		<label for="user">Author</label>
		<AuthorSelect authors={data.authors} required />
		<label for="description">Description</label>
		<textarea name="description" placeholder="Description..."></textarea>
		<div>
			<button type="submit">Create Book</button>
		</div>
	</form>
</Modal>

<style lang="scss">
	.wrapper {
		display: flex;
		flex-direction: column;

		> ul {
			display: flex;
			flex-direction: column;
			gap: 0.5em;
		}
	}

	.book {
		display: flex;
		flex-direction: row;
		align-items: baseline;
		gap: 1em;
		max-height: 2em;
		flex-wrap: wrap;
	}

	.modal {
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: center;
		gap: 1em;

		> div {
			grid-column: span 2;
			display: flex;
			justify-content: flex-end;
		}
	}

	small {
		text-overflow: ellipsis;
	}
</style>
