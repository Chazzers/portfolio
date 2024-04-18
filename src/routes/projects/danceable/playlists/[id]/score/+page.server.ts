import { postData, getData } from '$lib/danceable/helpers/dataFetch';
import { CLIENT_ID, CLIENT_SECRET } from '$env/static/private';
import type { PageServerLoad } from './$types.js';

type FetchType = (
	input: RequestInfo | URL,
	init?: RequestInit | undefined,
) => Promise<Response>;

export const load = (async ({ params, cookies, fetch }) => {
	const refreshToken = cookies.get('refresh_token');
	const playlistId = params.id;

	if (!refreshToken) {
		return new Response(JSON.stringify({ success: false }));
	}

	const accessToken = await getAccessToken(refreshToken, fetch);

	const trackData = getTracks(
		`https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
		accessToken,
		fetch,
	);

	return { trackData };
}) satisfies PageServerLoad;

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

// get tracks
async function getTracks(url: string, accessToken: string, fetch: FetchType) {
	try {
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

		const trackIds = allTracks.map((array) =>
			array.map((item) => item.track.id).join(),
		);

		const audioFeaturesPromiseArray = trackIds.map((item) => {
			const url = `https://api.spotify.com/v1/audio-features?ids=${item}`;
			return getData(url, accessToken, fetch);
		});

		const audioFeaturesData = [
			...(await Promise.all(audioFeaturesPromiseArray)),
		];

		const mergeArrays = allTracks.reduce((prev, cur, index) => {
			const currentFeatures = audioFeaturesData[index].audio_features;

			const tracksWithAudioFeatures = cur.map((track) => {
				const feature = currentFeatures.find(
					(features) => features.id === track.track.id,
				);

				return {
					id: track.track.id,
					duration: track.track.duration_ms,
					name: track.track.name,
					tempo: feature.tempo,
					danceability: feature.danceability,
				};
			});

			return [...prev, ...tracksWithAudioFeatures];
		}, []);

		const score = calcScore(mergeArrays, 'danceability');

		return { trackData: mergeArrays, score };
	} catch (error) {
		throw console.error(error);
	}
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
	const standardDeviation = Math.sqrt(
		array
			.map((x) => Math.pow(x[property] - average, 2))
			.reduce((a, b) => a + b) / array.length,
	);
	const scale = 0.5;
	return (1 - standardDeviation / average - scale) / 10;
}
// calc average of array of values
function calcAverage(array, property) {
	return array.reduce((a, b) => a + b[property], 0) / array.length;
}
