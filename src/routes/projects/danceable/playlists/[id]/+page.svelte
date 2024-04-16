<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { ROUTE } from '$lib/components/danceable/types/route';
	import { playlistData } from '$lib/components/danceable/store/store';
	import { goto } from '$app/navigation';

	onMount(async () => {
		const scoreUrl = `/${ROUTE.BASE}/${ROUTE.PLAYLISTS}/${$page.params.id}/${ROUTE.SCORE}`;
		const response = await fetch(scoreUrl);
		const data = await response.json();

		playlistData.set(data);
		goto(scoreUrl);
	});
</script>

<div class="loading-animation">
	<h1>Calculating score...</h1>
	<div class="loading-music">
		<div></div>
		<div></div>
		<div></div>
	</div>
</div>

<style>
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
</style>
