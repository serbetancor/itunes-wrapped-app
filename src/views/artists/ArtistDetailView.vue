<script setup lang="ts">
import { onMounted, ref } from 'vue'

import type { Artist } from '@/models/itunes'

import { useiTunesApi } from '@/apis/use-itunes-api'
import ImagePosition from '@/components/ImagePosition.vue'
import SimpleSong from '@/components/songs/SimpleSong.vue'

const props = defineProps({
  id: { required: true, type: String },
})

const artist = ref<Artist>()

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
        <ImagePosition
          :image="artist.image"
          :position="artist.position"
          class="desktop:w-100 text-9xl"
        />
        <h1 class="text-3xl font-bold">{{ artist.name }}</h1>
        <p class="text-gray-400">{{ artist.songsCount }} songs</p>
      </div>
      <div class="flex w-full flex-col gap-4 p-2">
        <span class="text-4xl">Top Songs</span>
        <SimpleSong v-for="song in artist.songs.slice(0, 10)" :key="song.id" :song />
      </div>
    </div>
  </div>
</template>
