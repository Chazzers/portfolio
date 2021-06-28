<template>
	<section>
		<div class="js-animate">
			<h2>My work</h2>
			<div>
				<MyWorkItem
					v-for="(workItem, index) in workItems"
					:key="index"
					:title="workItem.title"
					:description="workItem.description"
					:github-link="workItem.githubLink"
					:icon-list="workItem.iconList"
				/>
			</div>
		</div>
	</section>
</template>

<script>
import { gsap } from 'gsap'
export default {
	data() {
		return {
			workItems: [
				{
					title: 'Danceable',
					description: 'How danceable is your spotify playlist?',
					githubLink: 'https://github.com/Chazzers/danceable-2.0',
					iconList: {
						html: true,
						css: true,
						js: true,
						node: true,
					},
				},
				{
					title: 'Beats by friends',
					description:
						'Make simple beats with piano and drums in realtime with others!',
					githubLink: 'https://github.com/Chazzers/beats-by-friends',
					iconList: {
						html: true,
						css: true,
						js: true,
						node: true,
						sockets: true,
					},
				},
				{
					title: 'Etnisch profileren in cijfers',
					description:
						'A dutch survey and article visualised with D3.js',
					githubLink:
						'https://github.com/Chazzers/etchnisch-profileren-in-cijfers',
					iconList: {
						html: true,
						css: true,
						js: true,
					},
				},
			],
		}
	},
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
	padding: 1em 0;
	background-color: var(--third-color);
	overflow: hidden;
}

h2 {
	padding: 0 1em;
	color: var(--second-color);
}

section .js-animate div {
	padding: 0 1em;
}

.js-animate {
	max-width: 1080px;
	margin: auto;
}

@media screen and (min-width: 768px) {
	section {
		padding: 2em 0;
	}
	h2 {
		padding: 0 2em;
	}
	section .js-animate div {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		padding: 0 2em;
	}
}

@media screen and (min-width: 1160px) {
	h2 {
		padding: 0 0;
	}
	section .js-animate div {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		padding: 0;
	}
}
</style>
