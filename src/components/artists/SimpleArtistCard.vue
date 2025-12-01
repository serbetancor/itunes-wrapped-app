<template>
  <div
    class="flex w-45 cursor-pointer flex-col items-center rounded-xl p-2 drop-shadow-xl transition-all duration-300 hover:scale-102"
  >
    <div
      class="from-blue via-purple to-pink absolute inset-0 z-0 rounded-2xl bg-linear-to-r p-0.5"
      :style="`background: linear-gradient(${randomAngle}deg, var(--color-blue), var(--color-purple), var(--color-pink));`"
    >
      <div class="h-full w-full rounded-2xl bg-white/90 dark:bg-zinc-800"></div>
    </div>
    <div class="relative z-10 flex h-full flex-col items-center p-2">
      <ImagePosition :image="artist.image" :position="artist.position" class="text-4xl" />
      <span class="text-center font-bold">{{ artist.name }}</span>
      <div class="my-auto flex w-full justify-center gap-2">
        <span class="text-center">{{ formatMilliseconds(artist.timePlayed) }}</span>
        <PositionsGained :positions-gained="artist.positionsGained" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type PropType, ref } from 'vue'

import type { Artist } from '@/models/itunes'

import ImagePosition from '@/components/ImagePosition.vue'
import PositionsGained from '@/components/PositionsGained.vue'
import { getRandomAngle } from '@/utils/itunes'
import { formatMilliseconds } from '@/utils/itunes'

defineProps({
  artist: { required: true, type: Object as PropType<Artist> },
})

const randomAngle = ref(getRandomAngle())
</script>
