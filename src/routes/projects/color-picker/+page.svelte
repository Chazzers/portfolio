<script lang="ts">
	import InViewObserver from '$lib/components/InViewObserver.svelte';
	import CodeExample from '$lib/components/code/CodeExample.svelte';
	import { onMount } from 'svelte';
	export let data;
	let canvas: HTMLCanvasElement;
	let tooltip: HTMLDivElement;
	let box: HTMLDivElement;
	onMount(() => {
		if (!canvas || !tooltip || !box) return;
		// Get the canvas and context
		const context = canvas.getContext('2d', {
			willReadFrequently: true
		});

		if (!context) return;

		// Load the image
		const img = new (window as any).Image();
		img.crossOrigin = 'anonymous';
		img.src = '/images/environment.jpg';
		let aspectRatio: number;
		// Wait for the image to load before drawing it on the canvas
		img.onload = () => {
			// Set the canvas size to match the image size
			canvas.width = img.width;
			canvas.height = img.height;
			const highestImgValue = Math.max(img.width, img.height);
			const lowestImgValue = Math.min(img.width, img.height);
			aspectRatio = highestImgValue / lowestImgValue;

			// Draw the image on the canvas
			context.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
			setCanvasSize(box, img, canvas, aspectRatio);
		};
		window.addEventListener('resize', () => {
			setCanvasSize(box, img, canvas, aspectRatio);
		});
		// Add a mousemove event listener to the canvas
		canvas.addEventListener('mousemove', (event) => {
			const canvasWidth = Number(removePxFromString(canvas.style.width));

			const canvasHeight = Number(removePxFromString(canvas.style.height));

			// Get current canvas width and height
			const rect = canvas.getBoundingClientRect();
			// Get the mouse coordinates
			const x = event.clientX - rect.left;
			const y = event.clientY - rect.top;
			const imgWidth = img.width;
			const imgHeight = img.height;
			// Calculate the coordinates of the mouse relative to the image
			const xMultiplier = imgWidth / canvasWidth;
			const yMultiplier = imgHeight / canvasHeight;
			// Get the new coordinates relative to the img size
			const newX = x * xMultiplier;
			const newY = y * yMultiplier;
			const boxWidth = box.offsetWidth;
			const boxHeight = box.offsetHeight;

			// Get the color of the pixel at the mouse coordinates
			const pixel = context.getImageData(newX, newY, 1, 1).data;
			if (tooltip) {
				// Width of tooltip element.
				const tooltipWidth = tooltip.offsetWidth;
				const tooltipHeight = tooltip.offsetHeight;
				// Calculate the luminance of the pixel.
				const luminance =
					(pixel[0] / 255) * 0.2126 + (pixel[1] / 255) * 0.7152 + (pixel[2] / 255) * 0.0722;

				tooltip.style.backgroundColor = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
				tooltip.style.color = luminance > 0.5 ? 'black' : 'white';
				tooltip.innerHTML = `Image of trees. </br> Red:${pixel[0]}, Green: ${pixel[1]}, Blue: ${pixel[2]}`;

				const tooltipPosOffsetX = 20;
				const tooltipPosOffsetY = 24;

				tooltip.style.transform = `translate(${
					// If the tooltip would overflow the image element, it snaps to the right side of the image element.
					// We use 20px and 24 to prevent the tooltip from being too close to the mouse.
					x + tooltipPosOffsetX + tooltipWidth > boxWidth
						? boxWidth - tooltipWidth - 1
						: x + tooltipPosOffsetX
					//
				}px,${
					y + tooltipPosOffsetY + tooltipHeight > boxHeight
						? boxHeight - tooltipHeight - 1
						: y + tooltipPosOffsetY
				}px)`;
			}
		});
	});
	function removePxFromString(stringWithPx: string) {
		return stringWithPx.split('px')[0];
	}
	function setCanvasSize(
		box: HTMLDivElement,
		img: HTMLImageElement,
		canvas: HTMLCanvasElement,
		aspectRatio: number
	) {
		// Get the coordinates of the mouse relative to the canvas
		const boxRect = box.getBoundingClientRect();
		const boxHeight = boxRect.height;
		const boxWidth = boxRect.width;
		const highestBoxValue = Math.max(boxHeight, boxWidth);
		const lowestBoxValue = Math.min(boxHeight, boxWidth);
		const boxAspectRatio = highestBoxValue / lowestBoxValue;
		let canvasWidth;
		let canvasHeight;

		if (img.width === img.height) {
			canvasWidth = boxWidth >= boxHeight ? boxWidth : boxWidth * boxAspectRatio;
			canvasHeight = boxHeight >= boxWidth ? boxHeight : boxHeight * boxAspectRatio;
		} else if (img.width > img.height) {
			canvasWidth = boxWidth >= boxHeight ? boxWidth * aspectRatio : boxHeight * aspectRatio;
			canvasHeight = boxWidth >= boxHeight ? boxWidth : boxHeight;
		} else if (img.width < img.height) {
			canvasWidth = boxWidth >= boxHeight ? boxWidth : boxHeight;
			canvasHeight = boxWidth >= boxHeight ? boxWidth * aspectRatio : boxHeight * aspectRatio;
		}

		const pixelWidth = `${canvasWidth}px`;
		const pixelHeight = `${canvasHeight}px`;

		canvas.style.width = pixelWidth;
		canvas.style.height = pixelHeight;
		return { canvasWidth, canvasHeight };
	}
</script>

<section>
	<InViewObserver classString={'in-view-container'} let:inView>
		<h1 class={inView ? 'in-view' : ''}>Creating an image on hover color-picker</h1>
		<h2 class={inView ? 'in-view' : ''}>Prototype</h2>
		<div class="canvas-container" bind:this={box}>
			<canvas bind:this={canvas}></canvas>
			<div class="tooltip" bind:this={tooltip}>Image of trees.</div>
		</div>
	</InViewObserver>

	<div class="md">
		<CodeExample {data} />
	</div>
</section>

<style>
	h1 {
		position: relative;
	}
	h2 {
		position: relative;
	}
	h2::after {
		position: absolute;
		content: '';
		bottom: 0;
		height: 4px;
		background-color: var(--color-red);
		width: 0;
		left: 0;
		transition: width 0.33s ease;
	}
	h2.in-view::after {
		width: 100%;
	}

	.tooltip {
		position: absolute;
		top: 0;
		left: 0;
		padding: 1em;
		color: transparent;
	}
	.canvas-container {
		position: relative;
		width: 100%;
		height: 50vh;
		overflow: hidden;
	}
	canvas {
		width: 100%;
		height: 100%;
	}
	p,
	ol {
		opacity: 0;
		transition: opacity 0.33s ease;
	}

	p.in-view,
	ol.in-view {
		opacity: 1;
	}
	section > div.md :global(h1 > span),
	section > div.md :global(h2 > span) {
		transform: none;
		opacity: 1;
	}
</style>
