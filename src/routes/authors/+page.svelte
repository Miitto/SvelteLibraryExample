<script lang="ts">
	import Modal from '$lib/Components/Modal.svelte';
	import type { PageServerData, ActionData } from './$types';
	import { onMount } from 'svelte';
	import { title } from '$lib';
	import { enhance } from '$app/forms';
	import type { Author } from '@prisma/client';

	export let data: PageServerData;

	$: authors = data.authors;

	onMount(() => {
		title.set('Authors');
	});

	let showNewAuthor = false;

	export let form: ActionData;

	let deleteSuccess: boolean | null = null;

	function deleteAuthor(author: Author) {
		authors = authors.filter((a) => a.id !== author.id);
		fetch(`/api/authors/${author.id}`, {
			method: 'DELETE'
		})
			.then((res) => {
				if (res.ok) {
					deleteSuccess = true;
				} else {
					authors = data.authors;
					deleteSuccess = false;
				}
			})
			.catch(() => {
				authors = data.authors;
				deleteSuccess = false;
			});
	}
</script>

{#key form}
	{#if form}
		{#if form.success}
			<p class="notif success">Author Successfully Created</p>
		{:else if form.success === false}
			<p class="notif error">Error Creating Author</p>
		{/if}
	{/if}
{/key}
{#key deleteSuccess}
	{#if deleteSuccess === true}
		<p class="notif success">Author Successfully Deleted</p>
	{:else if deleteSuccess === false}
		<p class="notif error">Error Deleting Author</p>
	{/if}
{/key}

<div class="wrapper">
	<h2>Authors</h2>
	<ul>
		{#each authors as author (author.id)}
			<li class="author">
				<p>{author.name}</p>
				<button on:click={() => deleteAuthor(author)}>Delete</button>
			</li>
		{:else}
			<p>No authors</p>
		{/each}
	</ul>
</div>
<button class="new" on:click={() => (showNewAuthor = true)}> + </button>
<Modal bind:show={showNewAuthor}>
	<h2 slot="header">New Author</h2>
	<form class="modal" use:enhance method="POST" on:submit={() => (showNewAuthor = false)}>
		<label for="author">Name</label>
		<input type="text" name="name" required placeholder="Name..." />
		<div>
			<button type="submit">Create Author</button>
		</div>
	</form>
</Modal>

<style lang="scss">
	.wrapper {
		display: flex;
		flex-direction: column;
		gap: 1em;

		> ul {
			gap: 0.5em;
			display: flex;
			flex-direction: column;
		}
	}

	.author {
		display: flex;
		align-items: center;

		p {
			flex: 1;
		}
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
</style>
