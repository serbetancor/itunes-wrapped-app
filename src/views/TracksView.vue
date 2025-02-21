<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref, computed, onMounted } from 'vue'

import NoImageIcon from '@/assets/no-image.svg'
import PositionsGained from '@/components/PositionsGained.vue'
import { useiTunesStore } from '@/stores/useiTunesStore'
import { formatMilliseconds } from '@/utils/itunes'

const store = useiTunesStore()

const topCount = ref<number>(20)

const { tracksLibrary } = storeToRefs(store)
const tracks = computed(() => tracksLibrary.value.data)
const shownTracks = computed(() => tracks.value.slice(0, topCount.value))

onMounted(async () => {
  await store.fetchTracks()
})
/*
const tooltip = ref<{ x: number; y: number; text: string; visible: boolean }>({
  text: '',
  visible: false,
  x: 0,
  y: 0,
})

const maxTimePlayed = computed(() => Math.max(...tracks.value.map((s) => s.timePlayed)))


const circles = computed(() => {
  const maxRadius = 350 / Math.sqrt(topCount.value)
  return tracks.value.slice(0, topCount.value).map((track, index) => {
    const radius = Math.sqrt(track.timePlayed / maxTimePlayed.value) * maxRadius
    const angle = (index / topCount.value) * Math.PI * 2
    const x = 375 + Math.cos(angle) * (350 - radius)
    const y = 375 + Math.sin(angle) * (350 - radius)

    const colors = ['fill-blue', 'fill-pink', 'fill-purple']
    const randomColor = colors[Math.floor(Math.random() * colors.length)]

    return {
      color: randomColor,
      id: track.id,
      name: track.name,
      radius,
      timePlayed: track.timePlayed,
      x,
      y,
    }
  })
})


const showTooltip = (event: MouseEvent, text: string) => {
  const container = (event.currentTarget as SVGElement).closest('div.relative') as HTMLDivElement
  if (container) {
    const rect = container.getBoundingClientRect()
    tooltip.value = {
      text,
      visible: true,
      x: event.clientX - rect.left + 5,
      y: event.clientY - rect.top - 35,
    }
  }
}

const hideTooltip = () => {
  tooltip.value.visible = false
}
*/
</script>

<template>
  <div class="flex flex-col items-center gap-4 p-4">
    <input type="range" v-model="topCount" min="1" max="400" class="mb w-64" />
    <span>Top {{ topCount }} track{{ topCount > 1 ? 's' : '' }}</span>

    <!--

    <div class="relative mt-4 flex w-3/4 justify-between">
      <svg viewBox="0 0 750 750" class="h-full w-1/2 rounded-lg border border-gray-300">
        <circle
          v-for="circle in circles"
          :key="circle.id"
          :cx="circle.x"
          :cy="circle.y"
          :r="circle.radius"
          :class="`${circle.color} opacity-80 transition-opacity hover:opacity-100`"
          @mousemove="(e) => showTooltip(e, circle.name)"
          @mouseleave="hideTooltip"
        />
      </svg>
      <div
        v-if="tooltip.visible"
        class="absolute rounded bg-black px-2 py-1 text-sm text-white shadow-lg"
        :style="{ top: `${tooltip.y}px`, left: `${tooltip.x}px` }"
      >
        {{ tooltip.text }}
      </div>
    -->

    <div class="w-10/12 px-4">
      <ul class="divide-y">
        <li
          v-for="track in shownTracks"
          :key="track.id"
          class="odd:bg-pink/10 grid min-h-12 grid-cols-[auto_auto_1fr_auto_auto] items-center gap-3 p-2 py-1"
        >
          <span class="w-4 font-semibold">{{ track.position }}</span>
          <img v-if="track.image" class="w-10 rounded-full" :src="track.image" />
          <NoImageIcon v-else class="w-10 rounded-full border p-2" /> <span>{{ track.name }}</span>
          <span>{{ formatMilliseconds(track.timePlayed) }}</span>
          <PositionsGained :positions-gained="track.positionsGained" />
        </li>
      </ul>
    </div>
    <!--
    </div>
    -->
  </div>
</template>
