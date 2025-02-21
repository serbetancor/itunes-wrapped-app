import type {
  AlbumsResponse,
  ArtistsResponse,
  GenresResponse,
  TracksResponse,
} from '@/models/itunes'

import { buildUrl, createApiFetch } from '@/apis/request'

type Endpoint = 'albums' | 'artists' | 'genres' | 'tracks'

export function useiTunesApi() {
  const baseUrl = 'https://itunes-wrapped-api.onrender.com/'
  const apiFetch = createApiFetch(baseUrl)

  function fetchData<T>(endpoint: Endpoint, id?: string) {
    return apiFetch(buildUrl(endpoint, { ...(id && { id }) })).json<T>()
  }

  return {
    getAlbums: (id?: string) => fetchData<AlbumsResponse>('albums', id),
    getArtists: (id?: string) => fetchData<ArtistsResponse>('artists', id),
    getGenres: (id?: string) => fetchData<GenresResponse>('genres', id),
    getTracks: (id?: string) => fetchData<TracksResponse>('tracks', id),
  } as const
}
