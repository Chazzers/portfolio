<script lang="ts">
	import InViewObserver from './InViewObserver.svelte';
</script>

<footer>
	<InViewObserver classString="" let:inView>
		{#if inView}
			<p>
				E-mail: <a href="mailto:chazz567@gmail.com"
					>chazz567@gmail.com</a
				>
			</p>
		{/if}
	</InViewObserver>
</footer>

<style>
	footer {
		background-color: var(--color-red);
		padding: 1em;
		justify-self: flex-end;
	}
	p,
	a {
		color: white;
	}

	a {
		text-decoration: underline;
	}
	p {
		font-size: 1.5em;
	}
</style>
