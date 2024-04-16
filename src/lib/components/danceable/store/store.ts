import { writable } from 'svelte/store';
import type { PlaylistType } from '../types/playlist';

export const playlistData = writable<{
	score: number | undefined;
	playlist: PlaylistType | undefined;
	tracks: any;
}>();
