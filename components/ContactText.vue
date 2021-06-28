<template>
	<section>
		<div class="js-animate">
			<h2>Contact</h2>
			<form
				action="mailto:chazz567@gmail.com"
				method="POST"
				enctype="multipart/form-data"
			>
				<label for="full-name">Full name</label>
				<input id="full-name" type="text" placeholder="John Doe" />
				<label for="e-mail">E-mail</label>
				<input
					id="e-mail"
					type="text"
					placeholder="john.doe@example.com"
				/>
				<label for="description">Description</label>
				<input
					id="description"
					type="text"
					placeholder="Job offer, Project details etc."
				/>
				<button type="submit">Submit</button>
			</form>
		</div>
	</section>
</template>

<script>
export default {}
</script>

<style scoped>
section {
	background-color: var(--second-color);
	padding: 1em 1em 2em;
}

.js-animate {
	max-width: 1080px;
	margin: auto;
}

h2 {
	color: var(--third-color);
}

input,
label {
	display: block;
	color: var(--third-color);
}
input {
	margin-bottom: 1em;
	width: 100%;
	padding: 0.5em;
	border: none;
}

button {
	padding: 1em;
	font-weight: 600;
	border: none;
	background-color: var(--third-color);
	color: var(--main-font-color);
}

@media screen and (min-width: 768px) {
	section {
		background-color: var(--second-color);
		padding: 2em 2em 4em;
	}
}
</style>
