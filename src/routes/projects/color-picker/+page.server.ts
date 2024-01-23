/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const response = await fetch('/color-picker.md');
	const data = await response.text();
	return { data: data };
}
