<template>
  <div class="flex flex-col items-center justify-center gap-4 p-4">
    <div
      ref="scrollContainer"
      class="scrollable my-auto flex max-h-275 max-w-275 flex-wrap items-center justify-center gap-4 overflow-y-auto p-4"
      :class="{
        'scroll-vertical-gradient-top':
          !scrollElement.arrivedState?.top && scrollElement.arrivedState?.bottom,
        'scroll-vertical-gradient-bottom':
          !scrollElement.arrivedState?.bottom && scrollElement.arrivedState?.top,
        'scroll-vertical-gradient':
          !scrollElement.arrivedState?.top && !scrollElement.arrivedState?.bottom,
      }"
    >
      <TrackCard v-for="track in shownTracks" :key="track.id" :track time-played class="w-3/8" />
    </div>
    <button
      class="bg-blue mt-auto mb-4 w-fit cursor-pointer rounded-full px-6 py-3 text-lg transition duration-300 hover:scale-110"
      @click="showMore = !showMore"
    >
      {{ showMore ? 'Show Top 20' : 'Show Top 100' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useScroll } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { ref, computed, onMounted, watch } from 'vue'

import TrackCard from '@/components/tracks/TrackCard.vue'
import { useiTunesStore } from '@/stores/useiTunesStore'

const store = useiTunesStore()

const showMore = ref(false)

const { tracksLibrary, isYearlyActive } = storeToRefs(store)
const tracks = computed(() => tracksLibrary.value.data)
const shownTracks = computed(() => tracks.value.slice(0, showMore.value ? 100 : 25))

const scrollContainer = ref<HTMLElement | null>(null)
const scrollElement = useScroll(scrollContainer)

watch(isYearlyActive, async (newValue, oldValue) => {
  if (newValue !== oldValue) {
    await store.fetchTracks()
  }
})

onMounted(async () => {
  await store.fetchTracks()
})
</script>
