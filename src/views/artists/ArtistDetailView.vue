<script setup lang="ts">
import { onMounted, ref } from 'vue'

import type { Artist } from '@/models/itunes'

import { useiTunesApi } from '@/apis/use-itunes-api'

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
  <div v-if="artist" class="flex flex-col gap-2">
    <span>Artist id: {{ artist.id }}</span>
    <span>Songs : {{ artist.songsCount }}</span>
  </div>
</template>
