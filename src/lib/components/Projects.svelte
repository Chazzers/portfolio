<script lang="ts">
	import IconList from './IconList.svelte';
	import InViewObserver from './InViewObserver.svelte';
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
			// readMoreLink: '/projects/esg-reporting',
			iconList: {
				html: true,
				css: true,
				js: true,
				node: false,
				sockets: false,
				svelte: true
			}
		},
		{
			title: 'Color picker',
			description: 'Extract image pixel color on hover of an image.',
			prototypeLink: 'https://chazzers.github.io/img-color-picker/',
			githubLink: 'https://github.com/Chazzers/img-color-picker',
			readMoreLink: '/projects/color-picker',
			iconList: {
				html: true,
				css: true,
				js: true,
				node: false,
				sockets: false,
				svelte: false
			}
		}
	];
</script>

<section>
	<InViewObserver classString={''} let:inView>
		<h1 class={inView ? 'in-view' : ''}>Projects</h1>
	</InViewObserver>
	<div>
		{#each projects as { title, description, githubLink, prototypeLink, iconList, readMoreLink }}
			<InViewObserver classString={''} let:inView>
				<article class={inView ? 'in-view-article' : ''}>
					<header>
						<h2>
							{title}
						</h2>
					</header>
					<main>
						<p>
							{description}
						</p>
						<div class="links">
							<a href={githubLink}><p>Github</p></a>
							<a href={prototypeLink}><p>Prototype</p></a>
							{#if readMoreLink}
								<a href={readMoreLink}><p>Read More</p></a>
							{/if}
						</div>
					</main>
					<IconList
						html={iconList.html}
						css={iconList.css}
						js={iconList.js}
						svelte={iconList.svelte}
						sockets={iconList.sockets}
						node={iconList.node}
					/>
				</article>
			</InViewObserver>
		{/each}
	</div>
</section>

<style>
	section {
		min-height: calc(90vh - 6rem);
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
		margin: 1em 0;
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
		margin: 0;
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
		flex-wrap: wrap;
        gap: 1rem;
	}
	.links a {
        flex: 1 1 calc(50% - 1rem);
        text-align: center;
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
