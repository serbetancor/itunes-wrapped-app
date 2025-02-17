<script setup lang="ts">
import type { Track } from '@/models/itunes'
import type { PropType } from 'vue'

import ImagePosition from '@/components/ImagePosition.vue'
import PositionsGained from '@/components/PositionsGained.vue'

defineProps({
  track: { required: true, type: Object as PropType<Track> },
})
</script>

<template>
  <div class="flex items-center gap-2">
    <ImagePosition :image="track.image" :position="track.position" class="w-8 text-sm" />
    <span> {{ track.name }} </span>
    <PositionsGained v-if="track.positionsGained" :positions-gained="track.positionsGained" />
  </div>
</template>
