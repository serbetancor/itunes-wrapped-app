<script setup lang="ts">
import { ref, type PropType } from 'vue'

import SimpleSong from '../songs/SimpleSong.vue'

import type { Artist } from '@/models/itunes'

import ImagePosition from '@/components/ImagePosition.vue'
import PositionsGained from '@/components/PositionsGained.vue'
import { formatMilliseconds } from '@/utils/itunes'
import { getRandomAngle } from '@/utils/itunes'

defineProps({
  albumNumber: { default: 2, required: false, type: Number },
  artist: { required: true, type: Object as PropType<Artist> },
  top: { default: false, required: false, type: Boolean },
})

const randomAngle = ref(getRandomAngle())
</script>

<template>
  <div
    class="relative flex cursor-pointer flex-col items-center rounded-2xl p-1 drop-shadow-xl transition-all duration-300 hover:scale-105"
  >
    <div
      class="from-blue via-purple to-pink absolute inset-0 z-0 rounded-2xl bg-gradient-to-r p-[2px]"
      :style="`background: linear-gradient(${randomAngle}deg, var(--color-blue), var(--color-purple), var(--color-pink));`"
    >
      <div class="h-full w-full rounded-2xl bg-white dark:bg-zinc-800"></div>
    </div>
    <div class="relative z-10 flex h-full flex-col items-center p-4">
      <ImagePosition
        :image="artist.image"
        :position="artist.position"
        class="text-4xl"
        :class="top ? 'w-50 text-9xl' : 'w-35 text-6xl'"
      />
      <span class="text-center font-bold">{{ artist.name }}</span>

      <div class="flex w-full justify-center gap-2">
        <span class="text-center">{{ formatMilliseconds(artist.timePlayed) }}</span>
        <PositionsGained :positions-gained="artist.positionsGained" />
      </div>

      <div class="my-auto flex flex-col gap-2">
        <SimpleSong v-for="song in artist.songs.slice(0, albumNumber)" :key="song.id" :song />
      </div>
    </div>
  </div>
</template>
