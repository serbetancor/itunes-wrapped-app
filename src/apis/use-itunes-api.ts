import type {
  Album,
  AlbumsResponse,
  Artist,
  ArtistsResponse,
  Genre,
  GenresResponse,
  Song,
  SongsResponse,
} from '@/models/itunes'

import { buildUrl, createApiFetch } from '@/apis/request'

export function useiTunesApi() {
  const baseUrl = 'https://itunes-wrapped-api.onrender.com/'
  const apiFetch = createApiFetch(baseUrl)

  function getAlbumById(id: string) {
    return apiFetch(buildUrl('albums', { id })).json<Album>()
  }

  function getAlbums() {
    return apiFetch(buildUrl('albums')).json<AlbumsResponse>()
  }

  function getArtistById(id: string) {
    return apiFetch(buildUrl('artists', { id })).json<Artist>()
  }

  function getArtists() {
    return apiFetch(buildUrl('artists')).json<ArtistsResponse>()
  }

  function getGenreById(id: string) {
    return apiFetch(buildUrl('genres', { id })).json<Genre>()
  }

  function getGenres() {
    return apiFetch(buildUrl('genres')).json<GenresResponse>()
  }

  function getSongById(id: string) {
    return apiFetch(buildUrl('songs', { id })).json<Song>()
  }

  function getSongs() {
    return apiFetch(buildUrl('songs')).json<SongsResponse>()
  }

  return {
    getAlbumById,
    getAlbums,
    getArtistById,
    getArtists,
    getGenreById,
    getGenres,
    getSongById,
    getSongs,
  } as const
}
