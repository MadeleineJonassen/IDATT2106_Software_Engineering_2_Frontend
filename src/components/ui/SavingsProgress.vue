<script setup lang="ts">
import { Progress } from '@/components/ui/progress'

interface Props {
  title: string
  target: number
  current: number
}

withDefaults(defineProps<Props>(), {
  target: 0,
  current: 0,
  title: 'Unknown'
})
</script>
<template>
  <div class="w-full flex flex-col gap-0">
    <div class="flex gap-5">
      <span class="scroll-m-20 text-base font-semibold tracking-tight w-full">
        {{ title }}
      </span>
      <span class="scroll-m-20 text-accent-foreground font-semibold text-gray-600 tracking-tight text-nowrap">
        {{ current }} / {{ target }}kr
      </span>
    </div>
    <Progress :max="100" :model-value="target == 0 ? 0 : (current / target) * 100" />
  </div>
</template>
