<script lang="ts">
	import SpinPlot from './SpinPlot.svelte';
	import SpinEsgBoard from './SpinESGBoard.svelte';
	import { writable } from 'svelte/store';
	export let companyData;
	export let count;
	export let year;
	const maxRotate = 30;
	const rotation = -maxRotate + companyData.score.ESG[year] * maxRotate;
	const maxWidth = writable(0);
</script>

<section style="--rotation: {rotation}deg">
	<SpinPlot allCompanies={true} {companyData} {count} {year} {maxWidth} />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 100%;
		width: 100%;
		transform: rotate(var(--rotation));
	}
</style>
