<script lang="ts">
	import { onMount } from 'svelte';
	let inViewElement: HTMLHeadingElement;
	let inView: boolean = false;
	export let classString: string;
	onMount(() => {
		let options = {
			root: null,
			rootMargin: '0px',
			threshold: 0.5
		};
		const callback = (entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					inView = true;
				}
			});
		};
		let observer = new IntersectionObserver(callback, options);

		observer.observe(inViewElement);
	});
</script>

<div class={classString ? classString : ''} bind:this={inViewElement}>
	<slot {inView} />
</div>

<style>
	.in-view-container {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}
</style>
