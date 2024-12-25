<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class']
    shade?: boolean
  }>(),
  {
    shade: false
  }
)
</script>

<template>
  <div :class="cn(shade ? 'relative' : undefined, props.class, 'bg-transparent p-0 md:p-0')">
    <div
      :class="
        cn(
          'rounded-3xl border border-card-border bg-card text-card-foreground shadow-sm px-4 py-4 md:px-14 md:py-9 backdrop-blur w-full h-full',
          shade ? 'hover:-translate-x-2 hover:-translate-y-2 transition-transform' : undefined,
          props.class
        )
      "
    >
      <slot />
    </div>
    <div v-if="shade" class="absolute w-full h-full rounded-3xl bg-background top-0 left-0 -z-10" />
  </div>
</template>
