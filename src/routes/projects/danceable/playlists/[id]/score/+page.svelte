<script lang="ts">
	import { ROUTE } from '$lib/danceable/types/route';
	import { playlistData } from '$lib/danceable/store/store.js';

	import Playlist from '$lib/danceable/components/Playlist.svelte';
	import ButtonComponent from '$lib/components/ButtonComponent.svelte';
	export let data;
</script>

<main>
	{#if $playlistData}
		<div class="score-container">
			<div class="score-container-playlist">
				<Playlist playlist={$playlistData}></Playlist>
			</div>
			{#await data.trackData}
				<div class="loading-animation">
					<h1>Calculating score...</h1>
					<div class="loading-music">
						<div></div>
						<div></div>
						<div></div>
					</div>
				</div>
			{:then dataLoaded}
				<div class="score-container-content">
					<h2>The danceability of your playlist is:</h2>
					<div class="score">
						<h1>{dataLoaded.score}<span>/100</span></h1>
					</div>
				</div>
			{:catch error}
				<p>{error.message}</p>
			{/await}
		</div>

		<ButtonComponent url="/{ROUTE.BASE}/{ROUTE.PLAYLISTS}">
			Measure another playlist
		</ButtonComponent>
	{:else}
		<h2>No playlist found</h2>
	{/if}
</main>

<style>
	main {
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 2rem;
		align-items: center;
	}
	.loading-animation {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		max-width: 25rem;
	}
	.loading-music {
		display: flex;
		justify-content: space-around;
		align-items: flex-end;
		position: relative;
		width: 48px;
		height: 36px;
	}

	.loading-music::after {
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 2px;
		background-color: var(--color-red);
		content: '';
	}

	.loading-music div {
		display: inline-flex;
		width: 10px;
		height: 100%;
		background: var(--color-red);
		animation: loading-music 1.2s linear infinite;
		transform-origin: bottom;
	}

	.loading-music div:nth-child(1) {
		animation-delay: -0.8s;
	}

	.loading-music div:nth-child(2) {
		animation-delay: -0.6s;
	}

	.loading-music div:nth-child(3) {
		animation-delay: -0.4s;
	}

	@keyframes loading-music {
		0% {
			transform: scaleY(1);
		}
		37.5% {
			transform: scaleY(0.25);
		}
		62.5% {
			transform: scaleY(0.75);
		}
		75% {
			transform: scaleY(0.5);
		}
		100% {
			transform: scaleY(1);
		}
	}

	@media only screen and (min-width: 768px) {
		main {
			padding: 2rem;
		}
		.score-container {
			display: flex;
			gap: 2rem;
		}
	}
</style>
