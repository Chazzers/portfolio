<template>
	<article>
		<h3>{{ title }}</h3>
		<p>{{ description }}</p>
		<a :href="githubLink" target="_blank">
			<p>View Github project</p>
			<svg
				width="24"
				height="15"
				viewBox="0 0 24 15"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M0.5 6.09094H16.5364V8.90932H0.5V6.09094Z"
					fill="black"
					stroke="black"
				/>
				<path
					d="M23.2826 7.5L17.094 13.5106V1.48936L23.2826 7.5Z"
					fill="black"
					stroke="black"
				/>
			</svg>
		</a>
		<IconList
			:html="iconList.html"
			:css="iconList.css"
			:js="iconList.js"
			:sass="iconList.sass"
			:node="iconList.node"
			:sockets="iconList.sockets"
		/>
	</article>
</template>

<script>
export default {
	props: {
		title: String,
		description: String,
		githubLink: String,
		iconList: Object,
	},
}
</script>

<style scoped>
article {
	background-color: var(--second-color);
	padding: 1rem;
	margin-bottom: 1rem;
}

h3 {
	color: var(--font-highlight-color);
}

a {
	display: flex;
	align-items: center;
	margin-bottom: 1rem;
	font-weight: bold;
	color: var(--main-font-color);
}

a p {
	margin-right: 1em;
}

a svg {
	transform: scale(1.2);
}

@media screen and (min-width: 768px) {
	article {
		margin: 1em;
		flex: 1 1 40%;
	}
}
</style>
