<script lang="ts">
	import { title } from '$lib/index';
	import '../styles.scss';

	import { page } from '$app/stores';
</script>

<div class="titlebar"><h1>{$title}</h1></div>
<ul class="sidebar">
	<li>
		<a href="/" class:active={$page.url.pathname == '/'}>Loans</a>
	</li>
	<li>
		<a href="/books" class:active={$page.url.pathname == '/books'}>Books</a>
	</li>
	<li>
		<a href="/users" class:active={$page.url.pathname == '/users'}>Users</a>
	</li>
	<li>
		<a href="/authors" class:active={$page.url.pathname == '/authors'}>Authors</a>
	</li>
</ul>
<main><slot /></main>

<style lang="scss">
	.titlebar {
		background-color: #222;
		height: 50px;
		width: 100%;
		padding: 0.5rem 1rem;

		h1 {
			margin: 0;
		}
	}

	.sidebar {
		background-color: #222;
		height: 100%;
		width: 200px;
		position: fixed;
		top: 50px;
		left: 0;
		display: flex;
		flex-direction: column;

		a {
			padding: 0.5rem 1rem;
			display: inline-block;
			width: 100%;
			color: white;
			text-decoration: none;

			&.active {
				background-color: #333;
			}

			&:hover {
				background-color: #333;
			}
		}
	}

	main {
		margin-left: 200px;
		padding: 20px;
	}
</style>
