<script lang="ts">
	import Playlist from '$lib/danceable/components/Playlist.svelte';
	import type { PlaylistType } from '$lib/danceable/types/playlist';

	export let data: {
		playlists: PlaylistType[];
	};

	const { playlists } = data;
</script>

<h1>Select a playlist</h1>
<h2>Measure the danceability of your playlist!</h2>
<main>
	<div>
		{#each playlists as playlist}
			<Playlist {playlist}></Playlist>
		{/each}
	</div>
</main>

<style>
	main > div {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		padding: 1rem 0 2rem;
	}
</style>
