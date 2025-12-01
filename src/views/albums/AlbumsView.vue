<template>
  <div class="flex flex-col items-center gap-4 p-4">
    <AlbumCollection
      ref="scrollContainer"
      :class="{
        'scroll-vertical-gradient-top':
          !scrollElement.arrivedState?.top && scrollElement.arrivedState?.bottom,
        'scroll-vertical-gradient-bottom':
          !scrollElement.arrivedState?.bottom && scrollElement.arrivedState?.top,
        'scroll-vertical-gradient':
          !scrollElement.arrivedState?.top && !scrollElement.arrivedState?.bottom,
      }"
      class="scrollable h-full max-h-275 overflow-y-auto"
      :albums
      :shown-albums="showMore ? 50 : 10"
    />
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

import AlbumCollection from '@/components/albums/AlbumCollection.vue'
import { useiTunesStore } from '@/stores/useiTunesStore'

const store = useiTunesStore()

const showMore = ref(false)

const { albumsLibrary, isYearlyActive } = storeToRefs(store)
const albums = computed(() => albumsLibrary.value.data)

const scrollContainer = ref<HTMLElement | null>(null)
const scrollElement = useScroll(scrollContainer)

watch(isYearlyActive, async (newValue, oldValue) => {
  if (newValue !== oldValue) {
    await store.fetchAlbums()
  }
})

onMounted(async () => {
  await store.fetchAlbums()
})
</script>
