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
  <div class="flex items-center gap-2 rounded-lg">
    <span v-if="index" class="w-6 text-center">{{ index }}</span>
    <div
      class="flex w-full cursor-pointer items-center rounded-xl bg-white p-3 transition-all dark:bg-white/10 dark:hover:bg-white/20"
    >
      <ImagePosition
        :image="track.image"
        :position="track.position"
        class="mr-2 w-8 shrink-0 text-sm"
      />
      <span class="mr-2 line-clamp-2"> {{ track.name }} </span>
      <PositionsGained
        :positions-gained="track.positionsGained"
        :class="{ 'ml-auto': !timePlayed }"
      />
      <span
        v-if="timePlayed"
        class="from-blue via-purple to-pink ml-auto bg-gradient-to-r bg-clip-text text-right font-bold text-transparent"
        :style="`background: linear-gradient(${randomAngle}deg, var(--color-blue), var(--color-purple), var(--color-pink)); -webkit-background-clip: text;`"
      >
        {{ formatMilliseconds(track.timePlayed) }}</span
      >
    </div>
  </div>
</template>
