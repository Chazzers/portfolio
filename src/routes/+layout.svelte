<script lang="ts">
	import { onMount } from 'svelte';
	import Footer from '$lib/components/Footer.svelte';

	onMount(() => {
		const allH1Titles = document.querySelectorAll('h1');
		allH1Titles.forEach((title) => {
			const content = title.textContent;
			const words = content?.split(' ');
			const newHTML: string[] = [];
			words?.forEach((word, index) => {
				const spanString = `<span style="--delay: ${
					index * 0.1
				}s">${word}</span>`;
				newHTML.push(spanString);
			});
			title.innerHTML = newHTML.join(' ');
		});
		const allH2Titles = document.querySelectorAll('h2');
		allH2Titles.forEach((title) => {
			const content = title.textContent;
			const words = content?.split(' ');
			const newHTML: string[] = [];
			words?.forEach((word, index) => {
				const spanString = `<span style="--delay: ${
					index * 0.1
				}s">${word}</span>`;
				newHTML.push(spanString);
			});
			title.innerHTML = newHTML.join(' ');
		});
	});
</script>

<div class="root">
	<div class="root-inner">
		<nav>
			<p><a href="/">Chazz' portfolio</a></p>
			<p><a href="/projects">Projects</a></p>
		</nav>
		<div class="wrapper">
			<slot />
		</div>
	</div>
	<Footer></Footer>
</div>

<style>
	.root {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		justify-content: space-between;
	}

	.root-inner {
		flex: 1 1 100%;
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.wrapper {
		padding: 1em;
		overflow: hidden;
		flex: 1 1 100%;
	}

	.wrapper:has(.prototype) {
		padding: 0;
		display: flex;
	}

	@media screen and (min-width: 768px) {
		.wrapper {
			padding: 2em;
		}
	}
	nav > p {
		margin: 0;
	}

	nav > p > a {
		color: black;
	}

	nav {
		display: flex;
		justify-content: space-between;
		border-bottom: 2px solid var(--color-red);
		padding: 1rem;
	}

	@media screen and (min-width: 768px) {
		nav > p {
			font-size: 1.5em;
		}
	}
</style>
