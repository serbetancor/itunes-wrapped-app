<template>
  <div
    v-if="positionsGained !== undefined"
    class="flex items-center"
    :class="{
      'text-red': positionsGained < 0,
      'text-green': positionsGained > 0,
    }"
  >
    <HyphenIcon v-if="positionsGained === 0" class="w-4" />
    <ArrowIcon v-else class="w-4" :class="{ 'rotate-180': positionsGained < 0 }" />
    <span class="mr-1 w-fit text-right">{{ positionsGained }}</span>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

import ArrowIcon from '@/assets/arrow.svg'
import HyphenIcon from '@/assets/hyphen.svg'

defineProps({
  positionsGained: { required: false, type: Number as PropType<number> },
})
</script>
