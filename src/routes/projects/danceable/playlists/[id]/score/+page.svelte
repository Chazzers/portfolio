<script lang="ts">
	import { ROUTE } from '$lib/components/danceable/types/route';
	import { playlistData } from '$lib/components/danceable/store/store.js';

	import Playlist from '$lib/components/danceable/Playlist.svelte';
	import ButtonComponent from '$lib/components/ButtonComponent.svelte';
</script>

<main>
	{#if $playlistData.playlist}
		<div class="score-container">
			<div class="score-container-playlist">
				<Playlist playlist={$playlistData.playlist}></Playlist>
			</div>

			<div class="score-container-content">
				<h2>The danceability of your playlist is:</h2>
				<div class="score">
					<h1>{$playlistData.score}<span>/100</span></h1>
				</div>
			</div>
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
