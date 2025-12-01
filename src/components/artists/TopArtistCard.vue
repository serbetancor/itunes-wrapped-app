<template>
  <div
    class="relative flex cursor-pointer flex-col items-center rounded-2xl p-1 drop-shadow-xl transition-all duration-300 hover:scale-102"
  >
    <div
      class="from-blue via-purple to-pink absolute inset-0 z-0 rounded-2xl bg-linear-to-r p-0.5"
      :style="`background: linear-gradient(${randomAngle}deg, var(--color-blue), var(--color-purple), var(--color-pink));`"
    >
      <div class="h-full w-full rounded-2xl bg-white/90 dark:bg-zinc-800"></div>
    </div>
    <div class="relative z-10 flex h-full w-full flex-col items-center p-4">
      <ImagePosition
        :image="artist.image"
        :position="artist.position"
        class="text-4xl"
        :class="top ? 'max-w-50 text-9xl' : 'max-w-35 text-6xl'"
      />
      <span class="text-center font-bold">{{ artist.name }}</span>

      <div class="flex w-full justify-center gap-2">
        <span class="text-center">{{ formatMilliseconds(artist.timePlayed) }}</span>
        <PositionsGained :positions-gained="artist.positionsGained" />
      </div>

      <div class="my-auto flex w-full flex-col gap-2">
        <TrackCard v-for="track in artist.tracks.slice(0, albumNumber)" :key="track.id" :track />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type PropType } from 'vue'

import type { Artist } from '@/models/itunes'

import ImagePosition from '@/components/ImagePosition.vue'
import PositionsGained from '@/components/PositionsGained.vue'
import TrackCard from '@/components/tracks/TrackCard.vue'
import { formatMilliseconds } from '@/utils/itunes'
import { getRandomAngle } from '@/utils/itunes'

defineProps({
  albumNumber: { default: 2, required: false, type: Number },
  artist: { required: true, type: Object as PropType<Artist> },
  top: { default: false, required: false, type: Boolean },
})

const randomAngle = ref(getRandomAngle())
</script>
