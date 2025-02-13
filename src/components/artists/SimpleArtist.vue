<script setup lang="ts">
import { type PropType, ref } from 'vue'

import type { Artist } from '@/models/itunes'

import NoImageIcon from '@/assets/no-image.svg'
import PositionsGained from '@/components/PositionsGained.vue'
import { getRandomAngle } from '@/utils/itunes'
import { formatMilliseconds } from '@/utils/itunes'

defineProps({
  artist: { required: true, type: Object as PropType<Artist> },
  index: { required: true, type: Number },
})

const randomAngle = ref(getRandomAngle())
</script>

<template>
  <div
    class="flex w-45 cursor-pointer flex-col items-center rounded-xl p-2 drop-shadow-xl transition-all duration-300 hover:scale-105"
  >
    <div
      class="from-blue via-purple to-pink absolute inset-0 z-0 rounded-2xl bg-gradient-to-r p-[2px]"
      :style="`background: linear-gradient(${randomAngle}deg, var(--color-blue), var(--color-purple), var(--color-pink));`"
    >
      <div class="h-full w-full rounded-2xl bg-white dark:bg-zinc-800"></div>
    </div>
    <div class="relative z-10 flex h-full flex-col items-center p-2">
      <div class="relative">
        <img v-if="artist.image" class="w-full rounded-full p-2" :src="artist.image" />
        <NoImageIcon v-else class="w-full rounded-full border p-6" />
        <span
          class="from-blue via-purple to-pink absolute bottom-2 left-1/9 bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent drop-shadow-md"
          :style="`background: linear-gradient(${randomAngle}deg, var(--color-blue), var(--color-purple), var(--color-pink)); -webkit-background-clip: text;`"
        >
          {{ index + 1 }}
        </span>
      </div>

      <span class="text-center font-bold">{{ artist.name }}</span>

      <div class="my-auto flex w-full justify-center gap-2">
        <span class="text-center">{{ formatMilliseconds(artist.timePlayed) }}</span>
        <PositionsGained :positions-gained="artist.positionsGained" />
      </div>
    </div>
  </div>
</template>
