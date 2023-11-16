<script lang="ts">
	import { onMount } from 'svelte';
	import getAge from '../../helpers/getAge';
	let inViewElement: HTMLHeadingElement;
	let inView = false;

	const age = getAge('1996-11-08');

	onMount(() => {
		let options = {
			root: null,
			rootMargin: '0px',
			threshold: 1.0
		};
		let callback = (entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					inView = true;
				}
			});
		};
		let observer = new IntersectionObserver(callback, options);

		observer.observe(inViewElement);
	});
	const oneYearAgo = (dateString) => {
		// Parse the input date string
		const inputDate = new Date(dateString);

		// Get the current date
		const currentDate = new Date();

		// Calculate the date one year ago
		const oneYearAgo = new Date();
		oneYearAgo.setFullYear(currentDate.getFullYear() - 1);

		// Check if the input date is approximately one year ago
		return inputDate >= oneYearAgo && inputDate < currentDate;
	};
	const graduationDate = '2023-11-10';
	const isRecent = oneYearAgo(graduationDate);
</script>

<section>
	<h1 class={inView ? 'in-view' : ''} bind:this={inViewElement}>About Me.</h1>
	<p class={inView ? 'in-view' : ''}>
		I'm {age} years old and live in Hoofddorp. In my free-time I like to game, drum and hang out
		with friends.
	</p>
	<p class={inView ? 'in-view' : ''}>
		I {isRecent ? 'recently' : ''} graduated from Hogeschool van Amsterdam with a bachelor's degree
		in Communication and Muiltimedia Design, specializing in Front-End development.
	</p>
	<p class={inView ? 'in-view' : ''}>
		During my study I worked half a year full-time and half a year part-time as a front-end
		developer at Skybox design agency.
	</p>
	<p class={inView ? 'in-view' : ''}>
		In my final year of studying, I did an internship at CLEVERºFRANKE, which is a data design
		and technology consultancy. There I learned to use React, Svelte and D3.
	</p>
	<p class={inView ? 'in-view' : ''}>
		Now I'm looking to further develop myself in the field of Front-End development.
	</p>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
	}
	section h1 {
		font-size: 2em;
	}
	p {
		opacity: 0;
		transition: opacity 1s ease 0.66s;
		font-size: 1.25em;
		margin: 0.5em 0;
	}

	@media screen and (min-width: 768px) {
		section h1 {
			font-size: 3em;
		}
		p {
			font-size: 1.5em;
		}
	}

	p.in-view {
		opacity: 1;
	}
</style>
