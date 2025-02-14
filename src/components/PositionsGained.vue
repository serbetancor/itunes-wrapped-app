<script setup lang="ts">
import ArrowIcon from '@/assets/arrow.svg'
import HyphenIcon from '@/assets/hyphen.svg'

defineProps({
  positionsGained: { required: true, type: Number },
})
</script>

<template>
  <div
    class="flex items-center"
    :class="{
      'text-red': positionsGained < 0,
      'text-green': positionsGained > 0,
    }"
  >
    <HyphenIcon v-if="positionsGained === 0" class="w-4" />
    <ArrowIcon v-else class="w-4" :class="{ 'rotate-180': positionsGained < 0 }" />
    <span class="ml-1 w-fit text-right">{{ positionsGained }}</span>
  </div>
</template>
