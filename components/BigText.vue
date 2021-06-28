<template>
	<main>
		<p>Hello there traveller of the digital landscape.</p>
		<p>
			My name is
			<span>Chazz Mannering</span>
			and I’m an aspiring Front-end developer...
		</p>
		<p>Welcome to my portfolio website!</p>
	</main>
</template>

<script>
import { gsap } from 'gsap'
export default {
	mounted() {
		this.animateText()
	},
	methods: {
		animateText() {
			const text = this.$el.querySelectorAll('main p')

			gsap.fromTo(
				text,
				{
					x: '50%',
					autoAlpha: 0,
				},
				{
					x: 0,
					autoAlpha: 1,
					stagger: 0.2,
				}
			)
		},
	},
}
</script>

<style scoped>
main {
	padding: 1rem;
	background: var(--linear-gradient);
	overflow: hidden;
}
main p {
	font-size: 1.5em;
	margin-bottom: 1em;
	font-weight: bold;
	visibility: hidden;
	opacity: 0;
	transform: translateX(50%);
}

span {
	color: var(--font-highlight-color);
}

@media screen and (min-width: 768px) {
	main {
		padding: 2em;
	}

	main p {
		font-size: 2em;
	}
}
</style>
