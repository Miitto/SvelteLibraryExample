<script lang="ts">
	import BookSelect from "$lib/Components/BookSelect.svelte";
import Modal from "$lib/Components/Modal.svelte";
	import UserSelect from "$lib/Components/UserSelect.svelte";
	import type { PageServerData } from "./$types";

    export let data: PageServerData;

    let showNewLoan = false;
</script>

<div class="wrapper">
    <h2>Late Books</h2>
    <ul>
        {#each data.lateBooks as loan (loan.id)}
        <li class="book">
            <h2>{loan.book.title}</h2>
            <p>{loan.book.author}</p>
            <p>{loan.dueDate}</p>
        </li>
        {:else}
        <p>No late books</p>
        {/each}
    </ul>
</div>
<div class="wrapper">
    <h2>Loaned Books</h2>
    <ul>
        {#each data.loanedBooks as loan (loan.id)}
        <li class="book">
            <h2>{loan.book.title}</h2>
            <p>{loan.book.author}</p>
            <p>{loan.dueDate}</p>
        </li>
        {:else}
        <p>No loaned books</p>
        {/each}
    </ul>
</div>
<button class="new"
on:click={() => showNewLoan = true}>
    +
</button>
<Modal bind:show={showNewLoan}>
<h2 slot="header">New Loan</h2>
<form class="modal">
    <label for="book">Book</label>
    <BookSelect books={data.books} required/>
    <label for="user">User</label>
    <UserSelect users={data.users} required/>
    <label for="dueDate">Due Date</label>
    <input type="date" name="dueDate" required/>
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
</style>