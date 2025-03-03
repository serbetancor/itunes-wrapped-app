<script setup lang="ts">
import { type PropType } from 'vue'

import type { Album } from '@/models/itunes'

import AlbumCard from '@/components/albums/AlbumCard.vue'

defineProps({
  albums: { required: true, type: Object as PropType<Album[]> },
  shownAlbums: { required: true, type: Number },
})
</script>

<template>
  <div class="flex flex-wrap justify-center gap-6 p-4">
    <AlbumCard v-for="album in albums.slice(0, shownAlbums)" :key="album.id" :album />
  </div>
</template>
