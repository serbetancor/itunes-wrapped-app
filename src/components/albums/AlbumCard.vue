<script setup lang="ts">
import { type PropType } from 'vue'

import type { Album } from '@/models/itunes'

import PositionsGained from '@/components/PositionsGained.vue'
import { formatMilliseconds } from '@/utils/itunes'

defineProps({
  album: { required: true, type: Object as PropType<Album> },
  timePlayed: { default: false, required: false, type: Boolean },
})
</script>

<template>
  <div
    class="relative flex max-w-1/2 cursor-pointer flex-col items-center justify-center rounded-lg bg-gray-400 p-6 shadow-lg transition-all hover:scale-102 hover:shadow-xl dark:bg-gray-900"
  >
    <div
      class="absolute inset-0 rounded-lg bg-cover bg-center opacity-30"
      :style="{ backgroundImage: `url(${album.image})` }"
    />

    <div class="relative z-10 flex flex-col items-center px-4 py-6 text-center text-white">
      <h2 class="hover:animate-glitch mb-2 text-2xl font-semibold">{{ album.name }}</h2>
      <PositionsGained :positions-gained="album.positionsGained" class="text-sm" />
      <span class="text-sm font-medium text-gray-50 dark:text-gray-400">
        {{ formatMilliseconds(album.timePlayed) }}
      </span>
    </div>
  </div>
</template>
