<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'

import type { Artist } from '@/models/itunes'

import { useiTunesApi } from '@/apis/use-itunes-api'
import ImagePosition from '@/components/ImagePosition.vue'
import TrackCard from '@/components/tracks/TrackCard.vue'
import { useiTunesStore } from '@/stores/useiTunesStore'

const props = defineProps({
  id: { required: true, type: String },
})

const artist = ref<Artist>()

const store = useiTunesStore()
const { isYearlyActive } = storeToRefs(store)

watch(isYearlyActive, async (newValue, oldValue) => {
  if (newValue !== oldValue) {
    const response = await useiTunesApi().getArtists(props.id)
    if (response.data.value) {
      artist.value = response.data.value.data[0]
    }
  }
})

onMounted(async () => {
  const response = await useiTunesApi().getArtists(props.id)
  if (response.data.value) {
    artist.value = response.data.value.data[0]
  }
})
</script>

<template>
  <div v-if="artist" class="flex justify-center gap-4 p-4">
    <div class="desktop:flex-row flex h-full max-w-350 flex-col gap-4">
      <div class="flex flex-col items-center gap-2">
        <div
          class="relative rounded-full border-4 border-gray-500 p-1 transition-all duration-300 hover:scale-102 hover:border-gray-200"
        >
          <ImagePosition
            :image="artist.image"
            :position="artist.position"
            class="desktop:w-100 text-9xl"
          />
        </div>
        <h1 class="mt-4 text-4xl font-extrabold tracking-wide">
          {{ artist.name }}
        </h1>
        <p class="text-gray-400">{{ artist.tracksCount }} tracks</p>
      </div>
      <div class="flex w-full flex-col gap-4 p-2">
        <!-- 
        <span class="mb-4 text-4xl tracking-wide">Top Albums</span>
        <AlbumCollection :albums="artist.albums" :shownAlbums="10" />
         -->
        <span class="mb-4 text-4xl tracking-wide">Top Tracks</span>
        <TrackCard
          v-for="(track, index) in artist.tracks.slice(0, 10)"
          :key="track.id"
          :index="index + 1"
          :track
          timePlayed
        />
      </div>
    </div>
  </div>
</template>
