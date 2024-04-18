import { Buffer } from 'buffer';

type FetchType = (
	input: RequestInfo | URL,
	init?: RequestInit | undefined,
) => Promise<Response>;

async function postData(
	url = '',
	{
		data = {},
		clientId,
		clientSecret,
		fetch,
	}: { data: any; clientId: string; clientSecret: string; fetch: FetchType },
) {
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			Authorization:
				'Basic ' +
				Buffer.from(clientId + ':' + clientSecret, 'utf8').toString(
					'base64',
				),
		},
		body: data,
	});
	return response.json();
}

async function getData(url: string, accessToken: string, fetch: FetchType) {
	const response = await fetch(url, {
		headers: {
			Authorization: 'Bearer ' + accessToken,
		},
	});
	const data = await response.json();

	return data;
}

export { postData, getData };
