import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import { Buffer } from 'buffer';

export const load = async ({ fetch, cookies, url }) => {
	const code = url.searchParams.get('code') || null;
	const state = url.searchParams.get('state') || null;
	const stateKey = 'spotify_auth_state';
	const storedState = cookies.get(stateKey) ? cookies.get(stateKey) : null;
	if (!state || state !== storedState || code === null) {
		const searchParams = new URLSearchParams({
			error: 'state_mismatch',
		});
		throw redirect(303, '/#?' + searchParams.toString());
	} else {
		cookies.delete(stateKey, { path: '/' });

		const searchParams = new URLSearchParams({
			code: code,
			redirect_uri: REDIRECT_URI,
			grant_type: 'authorization_code',
		});

		const response = await postData(
			'https://accounts.spotify.com/api/token',
			{
				data: searchParams,
				clientId: CLIENT_ID,
				clientSecret: CLIENT_SECRET,
			},
		);
		const refreshToken = response.refresh_token;

		const cookieConfig = {
			httpOnly: true, // to disable accessing cookie via client side js
			//secure: true, // to force https (if you use it)
			maxAge: 1000000, // ttl in seconds (remove this option and cookie will die when browser is closed)
			path: '/',
		};

		cookies.set('refresh_token', refreshToken, cookieConfig);
		const baseUrl = cookies.get('danceable_base_url');

		throw redirect(303, `${baseUrl}/playlists`);
	}
};

async function postData(url = '', { data = {}, clientId, clientSecret }) {
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
