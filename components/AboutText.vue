<template>
	<section>
		<div class="js-animate">
			<h2>About me</h2>
			<div class="img-container">
				<NiceImg
					:data-src="'profile-pic.jpg'"
					:sizes="'(min-width: 768px) 100%, 100%'"
				/>
			</div>
			<div class="body-text">
				<p>
					Hi, I’m Chazz Mannering, 24 years old and I live in
					Hoofddorp. In my free time I like to drum, game and hang out
					with friends.
				</p>
				<p>
					At the moment I’m a student at HvA (Hogeschool van
					Amsterdam) where I’m studying CMD (Communication &
					Multimedia Design). This is where I developed a passion for
					Front-end development.
				</p>
				<p>
					Over the course of a few years I've learned a lot about
					HTML, CSS, JavaScript, Node and more...
				</p>
				<p>
					Recently I finished the CMD-minor Web-design and
					Development.
				</p>
				<p>
					Currently I am working at Skybox as a Front-end developer
					where we use Vue and Nuxt as Front-end frameworks.
				</p>
			</div>
		</div>
	</section>
</template>

<script>
import { gsap } from 'gsap'
export default {
	mounted() {
		this.animate()
	},
	methods: {
		animate() {
			const animationContainer = this.$el.querySelector('.js-animate')
			const elements = this.$el.querySelectorAll('.js-animate > *')

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: animationContainer,
					start: 'top 80%',
				},
			})

			tl.from(elements, {
				autoAlpha: 0,
				x: '50%',
			}).to(elements, {
				x: 0,
				stagger: {
					each: 0.1,
					ease: 'power2',
				},
				autoAlpha: 1,
			})
		},
	},
}
</script>

<style scoped>
section {
	background-color: var(--main-color);
	padding: 1rem;
	overflow: hidden;
}

section .img-container {
	width: 100%;
}

section .js-animate > * {
	visibility: hidden;
	opacity: 0;
	transform: translateX(50%);
}

@media screen and (min-width: 768px) {
	section {
		padding: 2em;
	}

	section .js-animate {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-areas:
			'h img'
			'p img';
		align-items: center;
	}

	section h2 {
		grid-area: h;
	}

	section .body-text {
		grid-area: p;
		margin-right: 1em;
	}

	section .img-container {
		grid-area: img;
		margin-left: 1em;
		height: 40vw;
		width: 40vw;
		max-width: 400px;
		max-height: 400px;
		margin: auto;
	}
}
</style>
