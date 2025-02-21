interface BaseEntity {
  id: number
  name: string
  timePlayed: number
  positionsGained?: number
  position: number
  image?: string
}

export interface Album extends BaseEntity {
  artist?: string
  year: number
  genre: string
  playCount: number
  tracks: Track[]
}

export interface Artist extends BaseEntity {
  tracks: Track[]
  tracksCount: number
}

export interface Genre extends BaseEntity {
  albums: Album[]
  artists: string[]
}

export interface Track extends BaseEntity {
  duration: number
  trackNumber: number
  artist: string
  album: string
  albumArtist?: string
  year: number
  genre: string
  playCount: number
}

export interface ApiResponse<T> {
  data: T[]
}

export type AlbumsResponse = ApiResponse<Album>
export type ArtistsResponse = ApiResponse<Artist>
export type GenresResponse = ApiResponse<Genre>
export type TracksResponse = ApiResponse<Track>
