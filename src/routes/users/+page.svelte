<script lang="ts">
	import Modal from '$lib/Components/Modal.svelte';
	import type { PageServerData, ActionData } from './$types';
	import { onMount } from 'svelte';
	import { title } from '$lib';
	import { enhance } from '$app/forms';
	import type { User } from '@prisma/client';

	export let data: PageServerData;

	$: users = data.users;

	onMount(() => {
		title.set('Users');
	});

	let showNewUser = false;

	export let form: ActionData;

	let deleteSuccess: boolean | null = null;

	function deleteUser(user: User) {
		users = users.filter((a) => a.id !== user.id);
		fetch(`/api/users/${user.id}`, {
			method: 'DELETE'
		})
			.then((res) => {
				if (res.ok) {
					deleteSuccess = true;
				} else {
					users = data.users;
					deleteSuccess = false;
				}
			})
			.catch(() => {
				users = data.users;
				deleteSuccess = false;
			});
	}
</script>

{#key form}
	{#if form}
		{#if form.success}
			<p class="notif success">User Successfully Created</p>
		{:else if form.success === false}
			<p class="notif error">Error Creating User</p>
		{/if}
	{/if}
{/key}
{#key deleteSuccess}
	{#if deleteSuccess === true}
		<p class="notif success">User Successfully Deleted</p>
	{:else if deleteSuccess === false}
		<p class="notif error">Error Deleting User</p>
	{/if}
{/key}

<div class="wrapper">
	<h2>Users</h2>
	<ul>
		{#each users as user (user.id)}
			<li>
				<p>{user.name}</p>
				<p>{user.email}</p>
				<button on:click={() => deleteUser(user)}>Delete</button>
			</li>
		{:else}
			<p>No users</p>
		{/each}
	</ul>
</div>
<button class="new" on:click={() => (showNewUser = true)}> + </button>
<Modal bind:show={showNewUser}>
	<h2 slot="header">New User</h2>
	<form class="modal" use:enhance method="POST" on:submit={() => (showNewUser = false)}>
		<label for="name">Name</label>
		<input type="text" name="name" required placeholder="Name..." />
		<label for="email">Email</label>
		<input type="email" name="email" required placeholder="Email..." />
		<div>
			<button type="submit">Create User</button>
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

			li {
				display: flex;
				align-items: baseline;
				gap: 0.5em;

				p:nth-last-child(2) {
					flex: 1;
				}
			}
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
