<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref, computed, onMounted } from 'vue'

import NoImageIcon from '@/assets/no-image.svg'
import PositionsGained from '@/components/PositionsGained.vue'
import { useiTunesStore } from '@/stores/useiTunesStore'
import { formatMilliseconds } from '@/utils/itunes'

const store = useiTunesStore()

const topCount = ref(20)

const { albumsLibrary } = storeToRefs(store)
const albums = computed(() => albumsLibrary.value.data)
const shownAlbums = computed(() => albums.value.slice(0, topCount.value))

onMounted(async () => {
  await store.fetchAlbums()
})
</script>

<template>
  <div class="flex flex-col items-center gap-4 p-4">
    <input type="range" v-model="topCount" min="1" max="400" class="mb w-64" />
    <span>Top {{ topCount }} album{{ topCount > 1 ? 's' : '' }}</span>

    <div class="w-10/12 px-4">
      <ul class="divide-y">
        <li
          v-for="album in shownAlbums"
          :key="album.id"
          class="odd:bg-blue/10 grid min-h-12 grid-cols-[auto_auto_1fr_auto_auto] items-center gap-3 p-2 py-1"
        >
          <span class="w-4 font-semibold">{{ album.position }}</span>
          <img v-if="album.image" class="w-10 rounded-full" :src="album.image" />
          <NoImageIcon v-else class="w-10 rounded-full border p-2" />
          <span>{{ album.name }}</span>
          <span>{{ formatMilliseconds(album.timePlayed) }}</span>
          <PositionsGained :positions-gained="album.positionsGained" />
        </li>
      </ul>
    </div>
  </div>
</template>
