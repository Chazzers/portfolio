import { writable } from 'svelte/store';
import type { PlaylistType } from '../types/playlist';

export const playlistData = writable<PlaylistType | undefined>();
