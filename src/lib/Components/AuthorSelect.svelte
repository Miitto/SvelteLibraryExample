<script lang="ts">
	import type { Author } from '@prisma/client';
	import Modal from './Modal.svelte';

	let show: boolean = false;

	export let authors: Author[] = [];
	export let required = false;

	$: filtered = authors.filter((author) =>
		author.name?.toLowerCase().includes(authorSearch.toLowerCase())
	);

	let value = '';

	let authorSearch = '';

	$: console.log(required);

	$: author = authors.find((author) => author.id === value);

	$: show && (authorSearch = '');
</script>

<Modal bind:show>
	<h2 slot="header">Select Author</h2>
	<form>
		<input type="text" placeholder="Search for a author..." bind:value={authorSearch} />
	</form>
	{#each filtered as author (author.id)}
		<button on:click|preventDefault={() => (value = author.id) && (show = false)}>
			<h3>{author.name}</h3>
		</button>
	{:else}
		<p>No Authors Found</p>
	{/each}
</Modal>
<input
	type="text"
	{required}
	placeholder="Select a author..."
	on:click|preventDefault={() => (show = true)}
	value={author?.name ?? ''}
	on:keydown={(evt) => {
		if (evt.key != 'Tab' && evt.key != 'Escape') show = true;
	}}
/>
<input type="text" name="author" hidden bind:value />

<style lang="scss">
	button {
		background-color: #5555;
		backdrop-filter: blur(10px);
		text-align: left;
	}
</style>
