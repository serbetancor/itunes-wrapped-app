<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import { ref, onMounted } from 'vue'

import { getRouter } from '@/router'
import { useiTunesStore } from '@/stores/useiTunesStore'

const topics = ['tracks', 'albums', 'artists', 'genres']
const isDark = ref(false)
const isYearlyActive = ref(false)

const store = useiTunesStore()

const toggleYearlyMode = useDebounceFn(() => {
  isYearlyActive.value = !isYearlyActive.value
  store.toggleYearlyMode()
}, 300)

const toggleDarkMode = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

onMounted(() => {
  if (localStorage.getItem('theme') === 'dark') {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
})

const currentYear = new Date().getFullYear()
const isGlitching = ref(false)

const triggerGlitch = () => {
  isGlitching.value = true
  setTimeout(() => {
    isGlitching.value = false
  }, 300)
}
</script>

<template>
  <div
    class="transition-color flex min-h-screen w-full flex-col bg-white text-zinc-700 duration-600 dark:bg-zinc-700 dark:text-white"
  >
    <button
      @click="toggleYearlyMode"
      class="absolute top-4 left-4 cursor-pointer text-2xl font-extrabold tracking-widest uppercase transition-all duration-300 ease-out before:absolute before:inset-0 before:-z-10 before:origin-bottom-left before:skew-y-3 before:transition-all before:duration-500 before:ease-in-out hover:before:scale-102 hover:before:skew-y-0 active:scale-95"
      @mouseover="triggerGlitch"
    >
      <span
        class="text-2xl transition-all duration-300 ease-out"
        :class="{
          'animate-glitch': isGlitching,
          'scale-110 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(255,0,255,0.8)]':
            isYearlyActive,
        }"
      >
        {{ currentYear }}
      </span>
    </button>
    <button
      @click="toggleDarkMode"
      class="absolute top-4 right-4 cursor-pointer rounded-full bg-gray-800 p-2 text-white shadow-md transition-all duration-600 dark:bg-yellow-400 dark:text-black"
    >
      <span v-if="isDark">🌞</span>
      <span v-else>🌙</span>
    </button>

    <div class="mt-12 flex h-fit w-full justify-center gap-4">
      <button
        v-for="topic in topics"
        :key="topic"
        class="text-gray border-blue hover:text-blue border-b p-2 text-lg ease-in-out hover:scale-110 hover:cursor-pointer"
        @click="getRouter().push({ name: topic })"
      >
        <span>{{ topic }}</span>
      </button>
    </div>
    <div class="flex w-full flex-grow justify-center">
      <router-view class="w-full" />
    </div>
  </div>
</template>
