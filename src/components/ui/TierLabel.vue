<script setup lang="ts">
import TrophyIcon from '@/components/icons/TrophyIcon.vue'
import { cn } from '@/lib/utils'
import type { HTMLAttributes } from 'vue'

interface Props {
  label: string
  type: number
  tier: number
  class?: HTMLAttributes['class']
}
const props = defineProps<Props>()
</script>
<template>
  <div :class="cn('flex gap-2.5 items-center', props.class)">
    <TrophyIcon :type="type" :tier="tier" />
    <small class="text-sm font-medium leading-none">
      {{ label }}
    </small>
  </div>
</template>
