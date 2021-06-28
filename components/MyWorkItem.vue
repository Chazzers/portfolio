<template>
	<article>
		<h3>{{ title }}</h3>
		<p>{{ description }}</p>
		<a :href="githubLink" target="_blank">View Github project</a>
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
	color: var(--third-color);
}

a {
	display: block;
	margin-bottom: 1rem;
}

@media screen and (min-width: 768px) {
	article {
		margin: 1em;
		flex: 1 1 40%;
	}
}
</style>
