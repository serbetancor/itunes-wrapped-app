<template>
  <div class="flex flex-wrap justify-center gap-6 p-4">
    <AlbumCard v-for="album in albums.slice(0, shownAlbums)" :key="album.id" :album />
  </div>
</template>

<script setup lang="ts">
import { type PropType } from 'vue'

import AlbumCard from '@/components/albums/AlbumCard.vue'
import type { Album } from '@/models/itunes'

defineProps({
  albums: { required: true, type: Object as PropType<Album[]> },
  shownAlbums: { required: true, type: Number },
})
</script>
