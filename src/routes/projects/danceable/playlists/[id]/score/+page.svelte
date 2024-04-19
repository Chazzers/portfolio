<script lang="ts">
	import { ROUTE } from '$lib/danceable/types/route';
	import { playlistData } from '$lib/danceable/store/store.js';

	import Playlist from '$lib/danceable/components/Playlist.svelte';
	import ButtonComponent from '$lib/components/ButtonComponent.svelte';
	import { onMount } from 'svelte';
	export let data;

	let trackData: any;
	let score = 0;

	// Update the circle's stroke-dasharray based on the target value
	function updateCircle(progress: number) {
		const size = 120;
		const strokeWidth = 8;
		const radius = (size - strokeWidth) / 2;
		const circumference = radius * Math.PI * 2;
		const dash = (progress * circumference) / 100;
		const circle = document.getElementById('progressCircle');
		if (circle) {
			setTimeout(() => {
				circle.style.strokeDasharray = `${dash} ${circumference - dash}`;
			}, 10);
		}
	}
	onMount(async () => {
		trackData = await data.trackData;
		if (trackData) {
			const target = trackData.score;

			const speed = 100;

			const increment = target / speed;
			setTimeout(() => updateCircle(target), 1);
			const interval = setInterval(() => {
				score += increment;
				if (score >= target) {
					clearInterval(interval);
					score = target;
				}
			}, 1);
		}
	});
</script>

<main>
	{#if $playlistData}
		<div class="score-container">
			<div class="score-container-playlist">
				<Playlist playlist={$playlistData}></Playlist>
			</div>
			{#if !trackData}
				<div class="loading-animation">
					<h1>Calculating score...</h1>
					<div class="loading-music">
						<div></div>
						<div></div>
						<div></div>
					</div>
				</div>
			{:else}
				<div class="score-container-content">
					<h2>The danceability of your playlist is:</h2>
					<div class="score">
						<h1>
							<span class="score-amount">{Math.round(score)}</span
							><span class="score-max">/100</span>
						</h1>
						<svg
							width="120"
							height="120"
							xmlns="http://www.w3.org/2000/svg"
						>
							<circle id="progressCircle" class="progress-circle"
							></circle>
						</svg>
					</div>
				</div>
			{/if}
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

	.score {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.progress-circle {
		--size: 120px;
		--half-size: calc(var(--size) / 2);
		--stroke-width: 8px;
		--radius: calc((var(--size) - var(--stroke-width)) / 2);
		--circumference: calc(var(--radius) * pi * 2);
		--dash: 0;
		fill: none;
		stroke: var(--color-red); /* Change this to your desired color */
		stroke-linecap: round;
		transform: rotate(-90deg);
		transform-origin: center center;
		stroke-width: var(--stroke-width);
		r: var(--radius);
		cx: var(--half-size);
		cy: var(--half-size);
		stroke-dasharray: 0 var(--circumference);
		transition: stroke-dasharray ease-out 0.5s;
	}
	.score svg {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.score h1 {
		margin: 0;
	}

	.score .score-max {
		font-size: 1rem;
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
