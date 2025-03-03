<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, onMounted, watch } from 'vue'

import PositionsGained from '@/components/PositionsGained.vue'
import { useiTunesStore } from '@/stores/useiTunesStore'
import { formatMilliseconds } from '@/utils/itunes'

const store = useiTunesStore()

const { genresLibrary, isYearlyActive } = storeToRefs(store)
const genres = computed(() => genresLibrary.value.data)

watch(isYearlyActive, async (newValue, oldValue) => {
  if (newValue !== oldValue) {
    await store.fetchGenres()
  }
})

onMounted(async () => {
  await store.fetchGenres()
})
</script>

<template>
  <div class="flex flex-col items-center gap-4 p-4">
    <div class="w-10/12 px-4">
      <ul class="divide-y">
        <li
          v-for="genre in genres"
          :key="genre.id"
          class="odd:bg-purple/10 grid min-h-12 grid-cols-[auto_1fr_auto_auto] items-center gap-2 p-2 py-1"
        >
          <span class="font-semibold">{{ genre.position }}</span>
          <span>{{ genre.name }}</span>
          <span>{{ formatMilliseconds(genre.timePlayed) }}</span>
          <PositionsGained :positions-gained="genre.positionsGained" />
        </li>
      </ul>
    </div>
  </div>
</template>
