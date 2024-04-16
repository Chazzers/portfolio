<script lang="ts">
	import type { PlaylistType } from './types/playlist';
	import { ROUTE } from './types/route';
	import { page } from '$app/stores';

	console.log($page);

	export let playlist: PlaylistType;
	const backupImgUrl = '/projects-assets/danceable/images/music-icon.png';
</script>

{#if $page.params.id}
	<div>
		<article>
			<h3><mark>{playlist.name}</mark></h3>
			<img
				src=" {playlist.images[0]
					? playlist.images[0].url
					: backupImgUrl}"
				alt=""
			/>
		</article>
	</div>
{:else}
	<a href="/{ROUTE.BASE}/{ROUTE.PLAYLISTS}/{playlist.id}" class="playlist">
		<article>
			<h3><mark>{playlist.name}</mark></h3>
			<img
				src=" {playlist.images[0]
					? playlist.images[0].url
					: backupImgUrl}"
				alt=""
			/>
		</article>
	</a>
{/if}

<style>
	a,
	div {
		display: block;
		width: 23rem;
		height: 23rem;
	}

	article {
		display: flex;
		position: relative;
		height: 100%;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-end;
	}

	article img {
		width: 100%;
		height: 100%;
		position: absolute;
		object-fit: cover;
		inset: 0;
		display: block;
	}

	article h3 {
		position: relative;
		z-index: 2;
		margin: 0;
		padding: 1rem;
		color: black;
	}

	article h3 mark {
		background-color: rgb(255, 255, 255, 0.8);
	}
</style>
