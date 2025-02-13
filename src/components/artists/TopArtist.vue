<script setup lang="ts">
import { ref, type PropType } from 'vue'

import type { Artist } from '@/models/itunes'

import NoImageIcon from '@/assets/no-image.svg'
import PositionsGained from '@/components/PositionsGained.vue'
import { formatMilliseconds } from '@/utils/itunes'
import { getRandomAngle } from '@/utils/itunes'

defineProps({
  albumNumber: { default: 2, required: false, type: Number },
  artist: { required: true, type: Object as PropType<Artist> },
  index: { required: true, type: Number },
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
      <div class="relative">
        <img
          v-if="artist.image"
          class="rounded-full p-6"
          :class="top ? 'w-50' : 'w-35'"
          :src="artist.image"
        />
        <NoImageIcon v-else class="w-full rounded-full border p-6" />
        <span
          class="from-blue via-purple to-pink absolute bottom-2 bg-gradient-to-r bg-clip-text font-bold text-transparent drop-shadow-md"
          :class="top ? 'left-0 text-9xl' : 'left-1/9 text-6xl'"
          :style="`background: linear-gradient(${randomAngle}deg, var(--color-blue), var(--color-purple), var(--color-pink)); -webkit-background-clip: text;`"
        >
          {{ index + 1 }}
        </span>
      </div>

      <span class="text-center font-bold">{{ artist.name }}</span>

      <div class="flex w-full justify-center gap-2">
        <span class="text-center">{{ formatMilliseconds(artist.timePlayed) }}</span>
        <PositionsGained :positions-gained="artist.positionsGained" />
      </div>

      <div class="my-auto grid w-full grid-cols-2 place-items-center gap-y-2">
        <div
          v-for="song in artist.songs.slice(0, albumNumber)"
          :key="song.id"
          class="flex w-5/6 cursor-pointer justify-center gap-2 rounded-2xl border border-gray-400 p-1 transition-shadow duration-300 hover:shadow-lg hover:shadow-gray-400"
        >
          <div class="flex flex-col items-center">
            <img v-if="song.image" class="h-6 w-6 rounded-full" :src="song.image" />
            <NoImageIcon v-else class="h-6 w-6 rounded-full border p-1" />
            <PositionsGained :positions-gained="song.positionsGained" />
          </div>
          <span class="line-clamp-3 w-1/2 text-xs">{{ song.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
