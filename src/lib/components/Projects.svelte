<script lang="ts">
	import { onMount } from 'svelte';
	import IconList from './IconList.svelte';
	let inViewElement: HTMLHeadingElement;
	let inView = false;
	const projects = [
		{
			title: 'Danceable',
			description: 'How danceable is your Spotify playlist?',
			githubLink: 'https://github.com/Chazzers/danceable-2.0',
			prototypeLink: 'https://danceable.onrender.com',
			iconList: {
				html: true,
				css: true,
				js: true,
				node: true,
				sockets: false,
				svelte: false
			}
		},
		{
			title: 'Beats by friends',
			description: 'Make simple beats with piano and drums in realtime with others!',
			githubLink: 'https://github.com/Chazzers/beats-by-friends',
			prototypeLink: 'https://beats-by-friends.onrender.com/',
			iconList: {
				html: true,
				css: true,
				js: true,
				node: true,
				sockets: true,
				svelte: false
			}
		},
		{
			title: 'ESG reporting (thesis)',
			description: 'Visualising ESG reports with Sveltekit.',
			prototypeLink: 'https://esg-reporting-gamma.vercel.app/intro',
			githubLink: 'https://github.com/Chazzers/esg-reporting',
			iconList: {
				html: true,
				css: true,
				js: true,
				node: false,
				sockets: false,
				svelte: true
			}
		}
	];

	onMount(() => {
		let options = {
			root: null,
			rootMargin: '0px',
			threshold: 0.75
		};
		const projectArticles = document.querySelectorAll('.projects');
		let callback = (entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					if (entry.target === inViewElement) {
						inView = true;
					}
					projectArticles.forEach((article) => {
						if (entry.target === article) {
							article.classList.add('in-view-article');
						}
					});
				}
			});
		};
		let observer = new IntersectionObserver(callback, options);

		observer.observe(inViewElement);

		projectArticles.forEach((article) => {
			observer.observe(article);
		});
	});
</script>

<section>
	<h1 bind:this={inViewElement} class={inView ? 'in-view' : ''}>Projects</h1>
	<div>
		{#each projects as project}
			<article class="projects">
				<header>
					<h2>
						{project.title}
					</h2>
				</header>
				<main>
					<p>
						{project.description}
					</p>
					<div class="links">
						<a href={project.githubLink}><p>Github</p></a>
						<a href={project.prototypeLink}><p>Prototype</p></a>
					</div>
				</main>
				<IconList
					html={project.iconList.html}
					css={project.iconList.css}
					js={project.iconList.js}
					svelte={project.iconList.svelte}
					sockets={project.iconList.sockets}
					node={project.iconList.node}
				/>
			</article>
		{/each}
	</div>
</section>

<style>
	section {
		min-height: 90vh;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}
	section div {
		display: flex;
		flex-direction: column;
		width: 100%;
	}
	section h1 {
		font-size: 2em;
	}
	p {
		opacity: 0;
		transition: opacity 1s ease 0.66s;
	}

	section article {
		padding: 1em;
		border: solid 2px var(--color-red);
		margin-bottom: 1rem;
		opacity: 0;
		transform: translate(25%, 0);
		transition: all 0.33s ease;
	}

	section article:global(.in-view-article) {
		opacity: 1;
		transform: translate(0, 0);
	}

	@media screen and (min-width: 768px) {
		section h1 {
			font-size: 3em;
		}
		section h2 {
			font-size: 2.25em;
		}
		section p {
			font-size: 1.5em;
		}
		section main p {
			font-size: 1.5em;
		}
		section div {
			flex-direction: row;
			flex-wrap: wrap;
		}
		section article {
			width: 25rem;
			margin: 1rem;
		}
	}

	:global(.in-view-article) p {
		opacity: 1;
	}
	:global(.in-view-article h2 > span) {
		animation-name: animate;
		animation-duration: var(--title-animation);
		animation-delay: var(--delay);
		animation-fill-mode: forwards;
	}

	h2 {
		overflow: hidden;
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

	:global(.in-view-article) h2::after {
		width: 100%;
	}

	@keyframes animate {
		100% {
			opacity: 1;
			transform: translate(0, 0);
		}
	}
	.links {
		display: flex;
		justify-content: space-around;
		flex-direction: row;
	}
	.links a {
		display: block;
		color: black;
		text-decoration: none;
		padding: 1em;
		border: solid 2px var(--color-red);
		position: relative;
		z-index: 1;
		transition: color 0.33s ease;
	}

	.links a:hover {
		color: white;
	}
	.links a::after {
		content: '';
		background-color: var(--color-red);
		position: absolute;
		left: 0;
		top: 0;
		height: 100%;
		width: 100%;
		transform: scaleX(0);
		transition: transform 0.33s ease;
		z-index: 0;
		transform-origin: right;
	}
	.links a:hover::after {
		transform: scaleX(1);
		transform-origin: left;
	}
	.links > a > p {
		position: relative;
		z-index: 1;
		margin: 0;
	}
</style>
