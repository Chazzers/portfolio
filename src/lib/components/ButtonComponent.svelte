<script lang="ts">
	import type { MouseEventHandler } from 'svelte/elements';

	export let handler: MouseEventHandler<HTMLButtonElement> | undefined =
		undefined;
	export let url: string | undefined = undefined;
</script>

{#if url}
	<a href={url}><slot /></a>
{:else if handler}
	<button on:click={handler}><slot /></button>
{/if}

<style>
	a,
	button {
		text-align: center;
		display: inline-block;
		color: black;
		text-decoration: none;
		padding: 1em;
		border: solid 2px var(--color-red);
		z-index: 1;
		background-image: linear-gradient(var(--color-red), var(--color-red));
		background-size: 0% 100%;
		background-repeat: no-repeat;
		background-position: top right;
		transition:
			background-size 0.15s ease,
			color 0.15s ease;
	}

	a:hover,
	button {
		color: white;
		background-size: 100% 100%;
		background-position: bottom left;
	}
</style>
