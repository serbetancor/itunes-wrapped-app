<template>
  <div
    class="relative flex h-240 w-135 flex-col items-center justify-center gap-4 [background:radial-gradient(circle_at_30%_30%,rgba(168,162,158,0.2),#27272a_70%)]"
  >
    <div
      class="absolute bottom-0 left-1/2 h-64 w-96 -translate-x-1/2 rounded-full bg-white opacity-5 blur-3xl"
    />

    <div
      class="grid size-full grid-cols-5 grid-rows-3 place-items-center gap-x-8 p-8 *:border-gray-200"
    >
      <div class="col-span-2 flex size-full place-content-center place-items-center gap-2">
        <div v-if="artists[0]" class="flex size-full flex-col items-center justify-center">
          <div class="relative row-start-2 flex aspect-square w-42 rounded-full p-2 shadow-lg">
            <div
              class="absolute inset-0 rounded-full bg-cover"
              :style="{ backgroundImage: `url(${artists[0].image})` }"
            />
          </div>

          <div class="row-start-3 flex flex-col justify-center text-center">
            <h2 class="text-lg font-semibold text-white">{{ artists[0].name }}</h2>
            <span class="text-sm text-gray-400">
              {{ formatMilliseconds(artists[0].timePlayed) }}
            </span>
          </div>
        </div>
      </div>

      <div class="col-span-3 flex size-full flex-col place-content-center place-items-center gap-2">
        <div class="flex flex-col items-center gap-2.5 p-2">
          <template v-for="(block, idx) in blocks" :key="idx">
            <span v-if="block.type === 'names'" class="text-xs text-white">
              {{ block.items.map((a) => a.name).join(' • ') }}
            </span>

            <div v-else class="flex gap-1">
              <div
                v-for="artist in block.items"
                :key="artist.id"
                class="relative flex aspect-square size-6 rounded-full bg-gray-900 p-2 shadow-lg"
              >
                <div
                  class="absolute inset-0 rounded-full bg-cover opacity-70"
                  :style="{ backgroundImage: `url(${artist.image})` }"
                />
              </div>
            </div>
          </template>
        </div>
      </div>

      <div class="col-span-5 size-full place-content-center place-items-center">
        <div class="flex size-full flex-col p-1">
          <div v-if="tracks[0]" class="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
            <img :src="iTunesLogo" alt="Logo" class="mr-2 ml-auto size-8" />
            <div class="relative mx-auto flex aspect-square size-42 rounded-lg p-2 shadow-lg">
              <div
                class="absolute inset-0 rounded-lg bg-cover"
                :style="{ backgroundImage: `url(${tracks[0].image})` }"
              />
            </div>
            <div class="flex flex-col">
              <h2 class="text-lg font-semibold text-white">{{ tracks[0].name }}</h2>
              <span class="text-left text-sm text-gray-400">
                {{ formatMilliseconds(tracks[0].timePlayed) }}
              </span>
            </div>
          </div>

          <div class="mt-8 grid grid-cols-3 grid-rows-2 gap-x-4 gap-y-2 text-sm">
            <div
              v-for="track in tracks.slice(1, 7)"
              :key="track.id"
              class="flex items-center gap-2"
            >
              <div class="relative flex aspect-square size-5 rounded-md bg-gray-900 p-2 shadow-lg">
                <div
                  class="absolute inset-0 rounded-md bg-cover opacity-70"
                  :style="{ backgroundImage: `url(${track.image})` }"
                />
              </div>
              <span class="line-clamp-1">{{ track.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="col-span-3 size-full place-content-center place-items-center">
        <div class="grid grid-cols-7 grid-rows-6 flex-col place-items-center gap-1 p-2">
          <div
            v-for="album in albums.slice(1, 43)"
            :key="album.id"
            class="relative flex aspect-square size-8 rounded-lg bg-gray-900 p-2 shadow-lg"
          >
            <div
              class="absolute inset-0 rounded-lg bg-cover opacity-70"
              :style="{ backgroundImage: `url(${album.image})` }"
            />
          </div>
        </div>
      </div>

      <div class="col-span-2 size-full place-content-center place-items-center">
        <div v-if="albums[0]" class="flex size-full flex-col items-center justify-center">
          <div class="relative row-start-2 flex aspect-square w-42 rounded-lg p-2 shadow-lg">
            <div
              class="absolute inset-0 rounded-lg bg-cover"
              :style="{ backgroundImage: `url(${albums[0].image})` }"
            />
          </div>

          <div class="row-start-3 flex flex-col justify-center text-center">
            <h2 class="text-lg font-semibold text-white">{{ albums[0].name }}</h2>
            <span class="text-sm text-gray-400">
              {{ formatMilliseconds(albums[0].timePlayed) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, onMounted } from 'vue'

import iTunesLogo from '@/assets/itunes-logo.png'
import { useiTunesStore } from '@/stores/useiTunesStore'
import { formatMilliseconds } from '@/utils/itunes'

const store = useiTunesStore()

const { albumsLibrary, artistsLibrary, tracksLibrary } = storeToRefs(store)
const albums = computed(() => albumsLibrary.value.data)
const artists = computed(() => artistsLibrary.value.data)
const tracks = computed(() => tracksLibrary.value.data)

const blocks = computed(() =>
  [
    { range: [1, 10], type: 'images' },
    { range: [1, 4], type: 'names' },
    { range: [10, 19], type: 'images' },
    { range: [4, 7], type: 'names' },
    { range: [20, 29], type: 'images' },
  ].map((b) => ({
    ...b,
    items: artists.value.slice(b.range[0], b.range[1]),
  })),
)

onMounted(async () => {
  await Promise.all([
    store.toggleYearlyMode(),
    store.fetchArtists(),
    store.fetchAlbums(),
    store.fetchTracks(),
  ])
})
</script>
