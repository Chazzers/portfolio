<div class="prototype">
	<slot />
</div>

<style>
	div {
		max-width: 780px;
		margin: auto;
		overflow-y: auto;
	}

	div.prototype :global(h1 > span),
	div.prototype :global(h2 > span) {
		opacity: 1;
		transform: none;
	}
</style>
