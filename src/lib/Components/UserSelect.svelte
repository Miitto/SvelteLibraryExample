<script lang="ts">
	import type { User } from '@prisma/client';
	import Modal from './Modal.svelte';

	let show: boolean = false;

	export let users: User[] = [];
	export let required = false;

	$: filtered = users.filter(
		(user) =>
			user.name?.toLowerCase().includes(userSearch.toLowerCase()) ||
			user.email?.toLowerCase().includes(userSearch)
	);

	let value = '';

	let userSearch = '';

	$: user = users.find((user) => user.id === value);

	$: show && (userSearch = '');
</script>

<Modal bind:show>
	<h2 slot="header">Select User</h2>
	<form>
		<input type="text" placeholder="Search for a user..." bind:value={userSearch} />
	</form>
	{#each filtered as user (user.id)}
		<button on:click|preventDefault={() => (value = user.id) && (show = false)}>
			<h3>{user.email}</h3>
		</button>
	{:else}
		<p>No Users Found</p>
	{/each}
</Modal>
<input
	type="text"
	{required}
	placeholder="Select a user..."
	on:click|preventDefault={() => (show = true)}
	value={user?.email ?? ''}
	on:keydown={(evt) => {
		if (evt.key != 'Tab' && evt.key != 'Escape') show = true;
	}}
/>
<input type="text" name="user" hidden bind:value />

<style lang="scss">
	button {
		background-color: #5555;
		backdrop-filter: blur(10px);
		text-align: left;
	}
</style>
