<script setup lang="ts">
import { ref } from 'vue'

import NoImageIcon from '@/assets/no-image.svg'
import { getRandomAngle } from '@/utils/itunes'

defineProps({
  image: { required: false, type: String },
  position: { required: true, type: Number },
})

const randomAngle = ref(getRandomAngle())
</script>

<template>
  <div class="relative h-fit">
    <img v-if="image" class="rounded-full" :src="image" />
    <NoImageIcon v-else class="rounded-full border" />
    <span
      class="from-blue via-purple to-pink absolute bottom-0 left-0 bg-gradient-to-r bg-clip-text font-bold text-transparent drop-shadow-md"
      :style="`background: linear-gradient(${randomAngle}deg, var(--color-blue), var(--color-purple), var(--color-pink)); -webkit-background-clip: text;`"
    >
      {{ position }}
    </span>
  </div>
</template>
