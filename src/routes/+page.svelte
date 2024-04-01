<script lang="ts">
	// Custom Components
	import BookSelect from '$lib/Components/BookSelect.svelte';
	import Modal from '$lib/Components/Modal.svelte';
	import LoanList from '$lib/Components/LoanList.svelte';
	import UserSelect from '$lib/Components/UserSelect.svelte';
	// Svelte imports
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	// Stores imports. Since title is in a file called index, we can import it directly from the folder instead of the file
	import { title } from '$lib';

	// Import the PageServerData type from the $types file. This gives end to end type safety for the data passed to the page
	import type { PageServerData } from './$types';

	// Get data from the page load in +page.server.ts
	export let data: PageServerData;

	// Toggle for the loan creation dialog
	let showNewLoan = false;

	// Set the page title when the component mounts (page load, in this case)
	onMount(() => {
		title.set('Loans');
	});
</script>

<!-- Container for late books -->
<div class="wrapper">
	<h2>Late Books</h2>
	<!-- Loan List component, giving the late books as the loans to show -->
	<LoanList loans={data.lateBooks} />
</div>
<!-- Horizontal Rule for a separator -->
<hr />
<div class="wrapper">
	<h2>Loaned Books</h2>
	<LoanList loans={data.loanedBooks} />
</div>
<!-- New button, sets the `showNewLoan` variable to true when clicked -->
<button class="new" on:click={() => (showNewLoan = true)}> + </button>

<!-- New Loan Modal, will show a dialog when showNewLoan is true -->
<Modal bind:show={showNewLoan}>
	<!-- Header element set to go in the "header" slot of the Modal component -->
	<h2 slot="header">New Loan</h2>

	<!-- Form element, using enhance for async server submission without page reloads. Will POST to the current server route calling the default action -->
	<form class="modal" use:enhance method="POST">
		<label for="book">Book</label>
		<!-- BookSelect component, passing the books from the page data as a prop. See component file for more information -->
		<BookSelect books={data.books} required />
		<label for="user">User</label>
		<!-- Same as with BookSelect, but with Users -->
		<UserSelect users={data.users} required />
		<label for="dueDate">Due Date</label>
		<!-- Input for the due date, required. type set to "date" for an automatic browser date picker -->
		<input type="date" name="dueDate" required />
		<!-- Container for button positioning -->
		<div>
			<!-- Submit button for the form, will automatically submit the form on click -->
			<button type="submit">Create Loan</button>
		</div>
	</form>
</Modal>

<style lang="scss">
	/* Styling for the form in the Modal*/
	.modal {
		display: grid;
		// Set columns to an auto width column and a column that will fill remaining space
		grid-template-columns: auto 1fr;
		align-items: center;
		gap: 1em;

		> div {
			// Span the grid across both columns
			grid-column: span 2;
			display: flex;

			// Align the button to the right
			justify-content: flex-end;
		}
	}

	/* Styling for the wrapper divs */
	.wrapper {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}
</style>
