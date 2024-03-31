<script lang="ts">
	import { enhance } from '$app/forms';
	import BookSelect from '$lib/Components/BookSelect.svelte';
	import Modal from '$lib/Components/Modal.svelte';
	import UserSelect from '$lib/Components/UserSelect.svelte';
	import type { PageServerData } from './$types';
	import LoanList from '$lib/Components/LoanList.svelte';

	import { title } from '$lib';
	import { onMount } from 'svelte';

	export let data: PageServerData;

	let showNewLoan = false;

	onMount(() => {
		title.set('Loans');
	});
</script>

<div class="wrapper">
	<h2>Late Books</h2>
	<LoanList loans={data.lateBooks} />
</div>
<hr />
<div class="wrapper">
	<h2>Loaned Books</h2>
	<LoanList loans={data.loanedBooks} />
</div>
<button class="new" on:click={() => (showNewLoan = true)}> + </button>
<Modal bind:show={showNewLoan}>
	<h2 slot="header">New Loan</h2>
	<form class="modal" use:enhance method="POST">
		<label for="book">Book</label>
		<BookSelect books={data.books} required />
		<label for="user">User</label>
		<UserSelect users={data.users} required />
		<label for="dueDate">Due Date</label>
		<input type="date" name="dueDate" required />
		<div>
			<button type="submit">Create Loan</button>
		</div>
	</form>
</Modal>

<style lang="scss">
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

	.wrapper {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}
</style>
