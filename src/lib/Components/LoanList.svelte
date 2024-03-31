<script lang="ts">
	import { formatDate } from '$lib';
	import type { Prisma } from '@prisma/client';

	type Loan = Prisma.LoanGetPayload<{
		include: { book: { include: { author: true } } };
	}>;

	export let loans: Loan[] = [];

	function returnBook(loan: Loan) {
		fetch(`/api/loans/${loan.id}`, {
			method: 'DELETE'
		}).then((res) => {
			if (res.ok) {
				deleteSuccess = true;
				loans = loans.filter((l) => l.id !== loan.id);
			} else {
				deleteSuccess = false;
			}
		});
	}

	let deleteSuccess: boolean | null = null;
</script>

<ul>
	{#each loans as loan (loan.id)}
		<li class="book">
			<h2>{loan.book.title}</h2>
			<p>{loan.book.author.name}</p>
			<p>{formatDate(loan.dueDate)}</p>
			<button on:click={() => returnBook(loan)}>Return</button>
		</li>
	{:else}
		<p>No loaned books</p>
	{/each}
</ul>

{#key deleteSuccess}
	{#if deleteSuccess === true}
		<p class="notif success">Book Successfully Returned</p>
	{:else if deleteSuccess === false}
		<p class="notif error">Error Returning Book</p>
	{/if}
{/key}

<style lang="scss">
	ul {
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
</style>
