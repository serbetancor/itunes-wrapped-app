<script setup lang="ts">
import type { Song } from '@/models/itunes'
import type { PropType } from 'vue'

import ImagePosition from '@/components/ImagePosition.vue'
import PositionsGained from '@/components/PositionsGained.vue'

defineProps({
  song: { required: true, type: Object as PropType<Song> },
})
</script>

<template>
  <div class="flex items-center gap-2">
    <ImagePosition :image="song.image" :position="song.position" class="w-8 text-sm" />
    <span> {{ song.name }} </span>
    <PositionsGained :positions-gained="song.positionsGained" />
  </div>
</template>
