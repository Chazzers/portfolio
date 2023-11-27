<script lang="ts">
	import showdown from 'showdown';
	import { onMount } from 'svelte';
	import highlight from 'highlight.js';

	export let data;

	const converter = new showdown.Converter();
	const html = converter.makeHtml(data.data);
	onMount(() => {
		highlight.highlightAll();
	});
</script>

<div>
	{@html html}
</div>

<style>
	div :global(code.hljs) {
		background-color: #f1f1f1;
	}
</style>
