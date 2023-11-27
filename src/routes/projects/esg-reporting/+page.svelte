<script lang="ts">
	import { writable } from 'svelte/store';
	import InViewObserver from '$lib/components/InViewObserver.svelte';
	import SpinPlotContainer from '$lib/components/spinPlot/SpinPlotContainer.svelte';
	import LandSection from '$lib/components/spinPlot/LandSection.svelte';
	export let data;
	const count = writable(0);

	// const pillars = data.data.map((item) => item.group);
	const nike = data.data.find((company) => company.name === 'Company A');
	const currentYear = '2026';
	const nonPillar = ['ESG', 'categoryScores'];
	const pillars = Object.keys(nike.score).filter((item) => !nonPillar.includes(item));
	const summedPillarScores =
		nike.score.Environment[currentYear] +
		nike.score.Social[currentYear] +
		nike.score.Governance[currentYear];

	const gradientValues = pillars.map(
		(pillar) => (nike.score[pillar][currentYear] / summedPillarScores) * 100
	);

	const radialGradientString = `conic-gradient(#BCDA7E 5% ${gradientValues[0] * 0.9}%, #6257E2  ${
		gradientValues[0] * 1.1
	}% ${(gradientValues[0] + gradientValues[1]) * 0.9}%, #2AC28B ${
		(gradientValues[0] + gradientValues[1]) * 1.1
	}% 95%, #BCDA7E 100%)`;
	const content = {
		tag: 'A very cool tagline for a very cool company'
	};
</script>

<section>
	<InViewObserver classString={'in-view-container'} let:inView>
		<h1 class={inView ? 'in-view' : ''}>ESG reporting</h1>
		<h2 class={inView ? 'in-view' : ''}>Prototypes</h2>
	</InViewObserver>
	<InViewObserver classString={'in-view-container'} let:inView>
		<h3>Conic gradient 'Pie' chart</h3>
		<LandSection {radialGradientString} companyData={nike} year={currentYear} {content} />
	</InViewObserver>
	<InViewObserver classString={'in-view-container'} let:inView>
		<h3 class={inView ? 'in-view' : ''}>Spinning top plot</h3>
		<div class="container">
			<SpinPlotContainer companyData={nike} {count} year={currentYear} />
		</div>
	</InViewObserver>

	<InViewObserver classString={'in-view-container'} let:inView>
		<h2 class={inView ? 'in-view' : ''}>Thesis context</h2>
		<p class={inView ? 'in-view' : ''}>
			My thesis is about creating a visual and interactive experience of an ESG report in the form
			of a generated microsite. The purpose of this microsite is to improve the effective
			communication of a companies' ESG impact. Because the client I was working for is
			CLEVERºFRANKE, which is a renowned data design and technology consultancy, my prototype
			contained a lot of data visualisations. Underneath I will talk about the different challenges
			I faced, creating some of the visualisations.
		</p>
	</InViewObserver>

	<InViewObserver classString={'in-view-container'} let:inView>
		<h2 class={inView ? 'in-view' : ''}>Technologies</h2>
		<p class={inView ? 'in-view' : ''}>
			The website was written in the JavaScript-framework React.js combined with Next.js. The image
			source comes from the headless CMS Sanity.
		</p>
	</InViewObserver>

	<InViewObserver classString={'in-view-container'} let:inView>
		<h2 class={inView ? 'in-view' : ''}>Challenges</h2>
	</InViewObserver>
	<InViewObserver classString={'in-view-container'} let:inView>
		<h3 class={inView ? 'in-view' : ''}>
			Challenge 1: Dynamic changing of background color on hover
		</h3>
		<p class={inView ? 'in-view' : ''}>
			The first challenge was to change the background color on hover position of the mouse over the
			image. This challenge can be broken down into two challenges
		</p>
		<ol class={inView ? 'in-view' : ''}>
			<li>Extract the color of the pixel the mouse hovers over</li>
			<li>Use this color to change the background color of the tooltip</li>
		</ol>
		<p class={inView ? 'in-view' : ''}>
			However both these challenges were easily solved as the examples found online were easy to
			understand and seemed to do the trick.
		</p>
	</InViewObserver>
	<InViewObserver classString={'in-view-container'} let:inView>
		<h3 class={inView ? 'in-view' : ''}>Challenge 2: Dynamic sizing</h3>
		<p class={inView ? 'in-view' : ''}>
			One of the hurdles I encountered fairly quickly was that when sizing a canvas with CSS, the
			visual size of the canvas changed, but the actual canvas didn't. This caused issues with the
			hover color extraction, resulting in the extraction of the wrong color. To fix this, I had to
			devise some funky formulas to resize the canvas, ensuring it scaled correctly with CSS sizing.
		</p>
	</InViewObserver>
	<InViewObserver classString={'in-view-container'} let:inView>
		<h4 class={inView ? 'in-view' : ''}>How my canvas scaling function works:</h4>
	</InViewObserver>
	<InViewObserver classString={'in-view-container'} let:inView>
		<p class={inView ? 'in-view' : ''}>
			Imagine you have a webpage where you want to display an image within a designated box, and you
			also have a canvas that should surround this image. Now, this function helps you figure out
			the ideal size for that canvas.
		</p>
	</InViewObserver>
	<InViewObserver classString={'in-view-container'} let:inView
		><p class={inView ? 'in-view' : ''}>
			First, it grabs the dimensions of the container (the box) and the image. Then, it calculates
			the aspect ratio of the container. The fun part begins when deciding how to adjust the canvas
			size based on the image and container dimensions.
		</p></InViewObserver
	>

	<InViewObserver classString={'in-view-container'} let:inView>
		<p class={inView ? 'in-view' : ''}>
			Finally, the function sets the canvas size in pixels and returns the calculated width and
			height for reference. Essentially, it ensures the canvas fits nicely around the image within
			its designated container, taking into account the proportions of both.
		</p>
	</InViewObserver>
	<InViewObserver classString={'in-view-container'} let:inView>
		<p class={inView ? 'in-view' : ''}>
			Eventually ending up with the result on top: A scalable image color picker.
		</p>
	</InViewObserver>
</section>

<style>
	h1 {
		position: relative;
	}
	h2 {
		position: relative;
	}
	h2::after {
		position: absolute;
		content: '';
		bottom: 0;
		height: 4px;
		background-color: var(--color-red);
		width: 0;
		left: 0;
		transition: width 0.33s ease;
	}
	h2.in-view::after {
		width: 100%;
	}
	p,
	ol {
		opacity: 0;
		transition: opacity 0.33s ease;
	}

	p.in-view,
	ol.in-view {
		opacity: 1;
	}

	@media screen and (min-width: 768px) {
		section div.container {
			height: 80vmin;
		}
	}
	section div.container {
		height: 50vmax;
		width: 100%;
		background-color: #041235;
		padding: 1em;
		box-sizing: border-box;
	}
</style>
