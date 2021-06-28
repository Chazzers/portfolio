<template>
	<img
		:data-src="'~/assets/images/' + dataSrc"
		:data-srcset="require('~/assets/images/' + dataSrc).srcSet"
		class="lazyload"
		:sizes="sizes"
	/>
</template>

<script>
export default {
	props: {
		dataSrc: String,
		sizes: String,
	},
}
</script>

<style scoped>
img {
	object-fit: cover;
	width: 100%;
	height: 100%;
}
</style>
