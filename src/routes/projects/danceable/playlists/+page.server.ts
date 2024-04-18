import { redirect } from '@sveltejs/kit';
import { Buffer } from 'buffer';
import { CLIENT_ID, CLIENT_SECRET } from '$env/static/private';
import { ROUTE } from '$lib/danceable/types/route';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, cookies }) => {
	const refreshToken = cookies.get('refresh_token') || null;
	if (refreshToken) {
		const accessToken = await getAccessToken(refreshToken, fetch);
		const playlists = await getAllPlaylists(
			'https://api.spotify.com/v1/me/playlists',
			accessToken,
			fetch,
		);

		return {
			playlists: playlists,
		};
	} else {
		throw redirect(303, `/${ROUTE.BASE}`);
	}
}) satisfies PageServerLoad;

async function getAccessToken(refreshToken, fetch) {
	try {
		const formData = new URLSearchParams({
			grant_type: 'refresh_token',
			refresh_token: refreshToken,
		});

		const response = await postData(
			'https://accounts.spotify.com/api/token',
			{
				data: formData,
				clientId: CLIENT_ID,
				clientSecret: CLIENT_SECRET,
				fetch: fetch,
			},
		);
		return response.access_token;
	} catch (error) {
		console.log(error);
	}
}

async function postData(
	url = '',
	{ data = {}, clientId, clientSecret, fetch },
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

async function getData(url, accessToken, fetch) {
	const response = await fetch(url, {
		headers: {
			Authorization: 'Bearer ' + accessToken,
		},
	});
	const data = await response.json();

	return data;
}

async function getAllPlaylists(url, accessToken, fetch) {
	const dataArray = [];
	const data = await getData(url, accessToken, fetch);

	dataArray.push(data.items);

	const arrayOfPlaylistArrays = await recursiveFetch({
		url: data.next,
		array: dataArray,
		accessToken: accessToken,
		fetch: fetch,
	});

	return mergeNestedArray(arrayOfPlaylistArrays, null);
}

// loop over the fetches if data.next is not null
async function recursiveFetch({ url, array, accessToken, fetch, count = 0 }) {
	if (url) {
		const data = await getData(url, accessToken, fetch);
		array.push(data.items);

		if (data.next) {
			return recursiveFetch({
				url: data.next,
				array: array,
				accessToken: accessToken,
				fetch: fetch,
			});
		}
		return data;
	}
	return array;
}

// clean data function that executes the rest of the functions
function cleanData(trackData, audioFeatureData) {
	const mergedTrackData = mergeNestedArray(trackData);
	const mergedAudioFeatureData = mergeNestedArray(
		audioFeatureData,
		'audio_features',
	);
	const mergedData = mergeData(mergedTrackData, mergedAudioFeatureData);
	const transformedData = mergedData.map((item) => transformData(item));
	const cleanedData = tidyData(transformedData);
	return cleanedData;
}

// create one array of nested arrays
function mergeNestedArray(array, property) {
	if (property) {
		const newArray = array.map((item) => item[property]);
		return [].concat.apply([], newArray);
	}
	return [].concat.apply([], array);
}

// add clean data to the objects
function transformData(data) {
	return Object.assign({}, data, {
		id: data.track.id,
		duration: data.track.duration_ms,
		name: data.track.name,
		danceability: data.audio_features.danceability,
		tempo: data.audio_features.tempo,
	});
}

// transform the object data to data im using in my app
function tidyData(data) {
	return data.map(({ id, duration, name, danceability, tempo }) => ({
		id,
		duration,
		name,
		danceability,
		tempo,
	}));
}

// merge two arrays
function mergeData(trackData, audioFeatureData) {
	trackData.forEach(
		(item, index) => (item.audio_features = audioFeatureData[index]),
	);
	return trackData;
}
