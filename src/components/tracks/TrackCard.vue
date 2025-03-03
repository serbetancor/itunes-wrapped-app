<script setup lang="ts">
import { ref, type PropType } from 'vue'

import type { Track } from '@/models/itunes'

import ImagePosition from '@/components/ImagePosition.vue'
import PositionsGained from '@/components/PositionsGained.vue'
import { formatMilliseconds } from '@/utils/itunes'
import { getRandomAngle } from '@/utils/itunes'

defineProps({
  index: { required: false, type: Number },
  timePlayed: { default: false, required: false, type: Boolean },
  track: { required: true, type: Object as PropType<Track> },
})

const randomAngle = ref(getRandomAngle())
</script>

<template>
  <div class="flex h-fit items-center gap-2 rounded-lg">
    <span v-if="index" class="w-6 text-center">{{ index }}</span>
    <div class="relative flex w-full flex-col items-center gap-2 transition-all hover:scale-102">
      <div
        class="from-blue via-purple to-pink absolute inset-0 z-0 rounded-2xl bg-gradient-to-r p-[2px]"
        :style="`background: linear-gradient(${randomAngle}deg, var(--color-blue), var(--color-purple), var(--color-pink));`"
      >
        <div class="h-full w-full rounded-2xl bg-white/90 dark:bg-zinc-800"></div>
      </div>

      <div class="z-10 flex h-full w-full items-center rounded-xl p-3">
        <ImagePosition
          :image="track.image"
          :position="track.position"
          class="mr-2 w-8 shrink-0 text-sm"
        />
        <span class="hover:animate-glitch mr-2 line-clamp-1">{{ track.name }}</span>
        <PositionsGained
          :positions-gained="track.positionsGained"
          :class="{ 'ml-auto': !timePlayed }"
        />
        <span
          v-if="timePlayed"
          class="from-blue via-purple to-pink ml-auto min-w-fit bg-gradient-to-r bg-clip-text text-right font-bold text-transparent"
          :style="`background: linear-gradient(${randomAngle}deg, var(--color-blue), var(--color-purple), var(--color-pink)); -webkit-background-clip: text;`"
        >
          {{ formatMilliseconds(track.timePlayed) }}
        </span>
      </div>
    </div>
  </div>
</template>
