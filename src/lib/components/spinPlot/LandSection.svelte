<script lang="ts">
	export let companyData;
	export let year;
	export let content;
	export let radialGradientString: string;
	import roundToDecimal from '../../../helpers/roundToDecimal';
</script>

<section id="land" class="land" style="background:{radialGradientString}">
	<div class="titles">
		<h1><b>{companyData.name}</b> ESG Report</h1>
		<h1><b>{roundToDecimal(companyData.score.ESG[year], 100)}</b>/1 ESG Score 2026</h1>
	</div>
	<h2>{content.tag}</h2>
</section>

<style>
	.land {
		height: calc(60vh);
		padding: 2rem;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}
	.titles {
		display: flex;

		& h1:first-child {
			margin-right: 5vw;
		}
		& h1,
		b {
			color: #000;
		}
	}
	h1 {
		text-transform: uppercase;
		font-size: clamp(1.5rem, 2.5vw, 2rem);
		margin: 0;
		transform: none;
	}
	h1 > :global(span),
	h2 > :global(span) {
		transform: none;
		opacity: 1;
	}
	h2 {
		font-size: clamp(3rem, 5.5vw, 4rem);
		line-height: 1;
		width: 80%;
		margin: 0;
		color: black;
		transform: none;
	}
</style>
