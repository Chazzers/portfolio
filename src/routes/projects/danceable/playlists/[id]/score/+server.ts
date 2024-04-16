import type { PageServerLoad } from './$types';
import { CLIENT_ID, CLIENT_SECRET } from '$env/static/private';
import { playlistData } from '$lib/components/danceable/store/store';
import { redirect } from '@sveltejs/kit';
import { ROUTE } from '$lib/components/danceable/types/route';

type FetchType = (
	input: RequestInfo | URL,
	init?: RequestInit | undefined,
) => Promise<Response>;

export const GET = (async ({ params, cookies, fetch }) => {
	const refreshToken = cookies.get('refresh_token');
	const playlistId = params.id;

	if (!refreshToken) {
		return;
	}

	const accessToken = await getAccessToken(refreshToken, fetch);

	const playlist = await getData(
		`https://api.spotify.com/v1/playlists/${playlistId}`,
		accessToken,
		fetch,
	);

	const tracks = await getTracks(
		`https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
		accessToken,
		fetch,
	);

	const cleanTracks = cleanData(tracks.trackData, tracks.audioFeaturesData);

	const score = calcScore(cleanTracks, 'danceability');

	return new Response(
		JSON.stringify({
			score: score,
			playlist: playlist,
			tracks: tracks,
		}),
	);
}) satisfies PageServerLoad;

async function getData(url: string, accessToken: string, fetch: FetchType) {
	const response = await fetch(url, {
		headers: {
			Authorization: 'Bearer ' + accessToken,
		},
	});
	const data = await response.json();

	return data;
}

async function getAccessToken(refreshToken: string, fetch: FetchType) {
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

// create a url from strings
function createUrl({ baseUrl, query, value }) {
	const url = `${baseUrl}${query ? `?${query}=` : ''}${value ? value : ''}`;
	return url;
}

// create fetch promises
function createPromises(
	array,
	promise,
	accessToken,
	{ baseUrl, query, promiseArray = [], fetch },
) {
	array.forEach((item) =>
		promiseArray.push(
			promise(
				createUrl({
					baseUrl: baseUrl,
					query: query,
					value: item,
				}),
				accessToken,
				fetch,
			),
		),
	);
	return promiseArray;
}

// get tracks
async function getTracks(url, accessToken, fetch: FetchType) {
	const getTrackData = await getData(url, accessToken, fetch);
	const allTracks = [getTrackData.items];
	if (getTrackData.next) {
		const totalAmountToFetch =
			Math.ceil((getTrackData.total - getTrackData.limit) / 100) - 1;
		const limit = 100;

		const urlArray = [getTrackData.next];

		for (let i = 0; i < totalAmountToFetch; i++) {
			const offset = (i + 2) * limit;
			const url = `https://api.spotify.com/v1/playlists/30fDIxDJoHY2t133CRPO0H/tracks?offset=${offset}&limit=100&locale=*`;
			urlArray.push(url);
		}

		const promiseArray = urlArray.map((url) => {
			return getData(url, accessToken, fetch);
		});

		const promisedTracks = await Promise.all(promiseArray);
		allTracks.push(...promisedTracks.map((track) => track.items));
	}

	const trackData = {
		trackIds: allTracks.map((array) =>
			array.map((item) => item.track.id).join(),
		),
		trackData: allTracks,
	};
	const finalData = {
		// make fetch calls out of the url ids of the tracks
		audioFeaturesData: await Promise.all(
			createPromises(trackData.trackIds, getData, accessToken, {
				baseUrl: 'https://api.spotify.com/v1/audio-features',
				query: 'ids',
				fetch: fetch,
			}),
		).then((res) => res),
		trackData: trackData.trackData,
	};
	return finalData;
}

// calc the final score
function calcScore(array, averageProperty) {
	const average = calcAverage(array, averageProperty);
	const decimalScore =
		average +
		calcStandardDeviationInfluence(array, 'danceability') +
		calcStandardDeviationInfluence(array, 'tempo');
	return Math.round(decimalScore * 100);
}
// calc the influence of the standard deviation of an array of values
function calcStandardDeviationInfluence(array, property) {
	const average = calcAverage(array, property);
	const standardDeviation = calcStandardDeviation(array, property);
	const percentageOfAverage = standardDeviation / average;
	const reversePercentage = 1 - percentageOfAverage;
	const scale = 0.5;
	const reversePercentageMinusScale = reversePercentage - scale;
	const finalScore = reversePercentageMinusScale / 10;
	return finalScore;
}
// calc average of array of values
function calcAverage(array, property) {
	return array.reduce((a, b) => a + b[property], 0) / array.length;
}

// calc the standardDeviation of an array of values
function calcStandardDeviation(array, property) {
	const average = calcAverage(array, property);
	return Math.sqrt(
		array
			.map((x) => Math.pow(x[property] - average, 2))
			.reduce((a, b) => a + b) / array.length,
	);
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
		return array;
	}
	return array;
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
