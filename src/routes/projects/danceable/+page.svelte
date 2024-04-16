<script lang="ts">
	import { ROUTE } from '$lib/components/danceable/types/route.js';
</script>

<main>
	<h1>Welcome to danceable!</h1>
	<p>
		The web application where you can measure the danceability of your
		spotify playlist! To make use of this app, you will have to login with
		spotify through the button down below.
	</p>
	<a href="/{ROUTE.BASE}/{ROUTE.LOGIN}" id="login">Login with spotify</a>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 1rem;
	}
	h1,
	p {
		margin: 0;
	}
	main a {
		text-align: center;
		display: inline-block;
		color: black;
		text-decoration: none;
		padding: 1em;
		border: solid 2px var(--color-red);
		position: relative;
		z-index: 1;
		transition: color 0.33s ease;
		background-image: linear-gradient(var(--color-red), var(--color-red));
		background-size: 0% 100%;
		background-repeat: no-repeat;
		background-position: top right;
		transition:
			background-size 0.15s ease,
			color 0.15s ease;
	}

	main a:hover {
		color: white;
		background-size: 100% 100%;
		background-position: bottom left;
	}

	main {
		padding: 2rem;
	}
</style>
