<script setup lang="ts">
import { useScroll } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import SimpleArtist from '@/components/artists/SimpleArtist.vue'
import TopArtist from '@/components/artists/TopArtist.vue'
import { useiTunesStore } from '@/stores/useiTunesStore'

const store = useiTunesStore()
const router = useRouter()

const showMore = ref(false)

const { artistsLibrary } = storeToRefs(store)
const artists = computed(() => artistsLibrary.value.data)

const scrollContainer = ref<HTMLElement | null>(null)
const scrollElement = useScroll(scrollContainer)

onMounted(async () => {
  await store.fetchArtists()
})
</script>

<template>
  <div class="flex flex-col items-center gap-4 p-4">
    <div v-if="!showMore" class="flex h-full max-w-350 flex-col items-center gap-4 px-4">
      <div
        v-for="(range, rangeIndex) in [
          {
            start: 0,
            end: 3,
            top: true,
            albumNumber: 4,
            class: 'desktop:w-1/3 h-150 desktop:mt-10',
          },
          { start: 3, end: 7, top: false, class: 'desktop:w-1/4 desktop:my-auto h-100' },
        ]"
        :key="rangeIndex"
        class="desktop:flex-row flex flex-col gap-4"
      >
        <TopArtist
          v-for="artist in artists.slice(range.start, range.end)"
          :key="artist.id"
          :album-number="range.albumNumber"
          :artist
          :class="range.class"
          :top="range.top"
          @click="router.push({ name: 'artist-detail', params: { id: artist.id } })"
        />
      </div>
    </div>
    <div
      v-else
      ref="scrollContainer"
      class="scrollable flex h-full max-h-275 flex-wrap justify-center gap-6 overflow-y-auto p-4"
      :class="{
        'scroll-vertical-gradient-top':
          !scrollElement.arrivedState?.top && scrollElement.arrivedState?.bottom,
        'scroll-vertical-gradient-bottom':
          !scrollElement.arrivedState?.bottom && scrollElement.arrivedState?.top,
        'scroll-vertical-gradient':
          !scrollElement.arrivedState?.top && !scrollElement.arrivedState?.bottom,
      }"
    >
      <SimpleArtist
        v-for="artist in artists.slice(0, 50)"
        :key="artist.id"
        :artist
        @click="router.push({ name: 'artist-detail', params: { id: artist.id } })"
      />
    </div>
    <button
      class="bg-blue mt-auto mb-4 w-fit cursor-pointer rounded-full px-6 py-3 text-lg transition duration-300 hover:scale-110"
      @click="showMore = !showMore"
    >
      {{ showMore ? 'Show Top 7' : 'Show Top 50' }}
    </button>
  </div>
</template>
