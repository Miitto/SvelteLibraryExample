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

	$: console.log(required);

	$: user = users.find((user) => user.id === value);

	$: show && (userSearch = '');
</script>

<Modal bind:show>
	<h2 slot="header">Select User</h2>
	<form>
		<input type="text" placeholder="Search for a user..." bind:value={userSearch} />
	</form>
	{#each filtered as user (user.id)}
		<div class="user">
			<h3>{user.name}</h3>
		</div>
	{:else}
		<p>No Users Found</p>
	{/each}
</Modal>
<input
	type="text"
	{required}
	placeholder="Select a user..."
	on:click|preventDefault={() => (show = true)}
	value={user?.name ?? ''}
	on:keydown={(evt) => {
		if (evt.key != 'Tab' && evt.key != 'Escape') show = true;
	}}
/>
<input type="text" name="user" hidden bind:value />
