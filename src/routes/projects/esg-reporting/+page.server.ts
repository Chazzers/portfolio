/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const response = await fetch('/new-dummy.json');
	const data = await response.json();
	return { data: data };
}
