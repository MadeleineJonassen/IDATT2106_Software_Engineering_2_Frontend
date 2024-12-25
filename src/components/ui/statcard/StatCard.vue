<script setup lang="ts">
import { type StatcardVariants, statcardVariants } from '@/components/ui/statcard/index'

defineProps<{
  title: string
  description?: string
  variant?: StatcardVariants['variant']
}>()
</script>
<template>
  <div :class="statcardVariants({ variant })">
    <p class="text-center md:text-start">{{ title }}</p>
    <p class="text-center md:text-start" v-if="description">{{ description }}</p>
  </div>
</template>
