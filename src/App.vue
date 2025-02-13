<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { getRouter } from '@/router'

const topics = ['songs', 'albums', 'artists', 'genres']
const isDark = ref(false)

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
</script>

<template>
  <div
    class="transition-color flex min-h-screen w-full flex-col bg-white text-zinc-700 duration-600 dark:bg-zinc-700 dark:text-white"
  >
    <div class="absolute top-4 right-4">
      <button
        @click="toggleDarkMode"
        class="cursor-pointer rounded-full bg-gray-800 p-2 text-white shadow-md transition-all duration-600 dark:bg-yellow-400 dark:text-black"
      >
        <span v-if="isDark">🌞</span>
        <span v-else>🌙</span>
      </button>
    </div>

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
