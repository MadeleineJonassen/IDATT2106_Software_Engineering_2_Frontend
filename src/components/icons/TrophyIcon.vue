<script setup lang="ts">
import { badgeMap, cn } from '@/lib/utils'
import { computed, type HTMLAttributes } from 'vue'

interface Props {
  type: number
  tier?: number
  class?: HTMLAttributes['class']
}
const props = defineProps<Props>()

const bgMap: {
  [key: string]: string
} = {
  '1': 'bronzeBadge.svg',
  '2': 'silverBadge.svg',
  '3': 'goldBadge.svg'
}
</script>
<template>
  <div :class="cn('flex items-center h-5 aspect-square relative', props.class)">
    <img
      v-if="tier"
      :src="`/badges/${bgMap[props.tier?.toString() ?? '']}`"
      class="w-auto h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-150"
      alt="Badge background"
    />
    <img
      :src="`/badges/${badgeMap[props.type?.toString() ?? '']}`"
      class="w-auto h-full relative"
      alt="Badge icon"
    />
  </div>
</template>
