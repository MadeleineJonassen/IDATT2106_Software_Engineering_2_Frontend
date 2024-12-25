<script setup lang="ts">
import { Progress } from '@/components/ui/progress'
import { computed } from 'vue'

const props = defineProps<{
  progressNum: number
  totalNum: number
}>()

const progressPercent = computed(() => {
  return Math.min(Number((props.progressNum / props.totalNum) * 100), 100)
})
</script>

<template>
  <div class="flex flex-row gap-1">
    <div>{{ progressNum }},-</div>
    <Progress :model-value="progressPercent" :max="100" class="self-end" />
    <div>{{ totalNum }},-</div>
  </div>
</template>
