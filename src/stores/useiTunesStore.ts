import { defineStore } from 'pinia'
import { ref } from 'vue'

import type {
  AlbumsResponse,
  ArtistsResponse,
  GenresResponse,
  SongsResponse,
} from '@/models/itunes'

import { useiTunesApi } from '@/apis/use-itunes-api'

export const useiTunesStore = defineStore('iTunes', () => {
  const albumsLibrary = ref<AlbumsResponse>({ data: [] })
  const artistsLibrary = ref<ArtistsResponse>({ data: [] })
  const genresLibrary = ref<GenresResponse>({ data: [] })
  const songsLibrary = ref<SongsResponse>({ data: [] })

  const fetchAlbums = async () => {
    if (!albumsLibrary.value.data.length) {
      const response = await useiTunesApi().getAlbums()
      if (response.data.value) {
        albumsLibrary.value = response.data.value
      }
    }
  }

  const fetchArtists = async () => {
    if (!artistsLibrary.value.data.length) {
      const response = await useiTunesApi().getArtists()
      if (response.data.value) {
        artistsLibrary.value = response.data.value
      }
    }
  }

  const fetchGenres = async () => {
    if (!genresLibrary.value.data.length) {
      const response = await useiTunesApi().getGenres()
      if (response.data.value) {
        genresLibrary.value = response.data.value
      }
    }
  }

  const fetchSongs = async () => {
    if (!songsLibrary.value.data.length) {
      const response = await useiTunesApi().getSongs()
      if (response.data.value) {
        songsLibrary.value = response.data.value
      }
    }
  }

  return {
    albumsLibrary,
    artistsLibrary,
    fetchAlbums,
    fetchArtists,
    fetchGenres,
    fetchSongs,
    genresLibrary,
    songsLibrary,
  }
})
