import type { PageServerLoad } from './$types.js';
import generateRandomString from '../../../../helpers/generateRandomString.js';
import { redirect } from '@sveltejs/kit';
import { REDIRECT_URI, CLIENT_ID } from '$env/static/private';

export const load = (async ({ cookies }) => {
	const responseType = 'code';
	const stateKey = 'spotify_auth_state';
	const scope = 'user-read-private user-read-email playlist-read-private';
	const urlAuthorize = 'https://accounts.spotify.com/authorize';
	const state = generateRandomString(16);

	cookies.set(stateKey, state, { path: '/' });

	const searchParams = new URLSearchParams({
		response_type: responseType,
		client_id: CLIENT_ID,
		scope: scope,
		redirect_uri: REDIRECT_URI,
		state: state,
	});

	const url = `${urlAuthorize}?${searchParams.toString()}`;

	throw redirect(303, url);
}) satisfies PageServerLoad;
