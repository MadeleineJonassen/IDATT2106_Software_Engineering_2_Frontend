<script setup lang="ts">
import Wave from '@/components/ui/Wave.vue'
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  title?: string
  class?: HTMLAttributes['class']
}>()
</script>
<template>
  <div class="flex flex-col min-h-screen h-full gap-10 w-full max-w-[100vw] bg-baseColor">
    <div
      class="flex items-center md:items-start md:place-content-start place-content-center md:pl-20"
      :class="title ? 'pt-28 pb-20' : 'py-20'"
    >
      <h1 class="scroll-m-20 text-4xl font-bold text-foreground tracking-tight lg:text-6xl" v-if="title">
        {{ title }}
      </h1>
    </div>
    <div class="flex flex-col w-0 min-w-full h-full flex-1">
      <Wave />
      <div class="min-h-full bg-background w-full flex-1 md:pb-10 pb-28">
        <div :class="cn('w-11/12 md:w-4/5 mx-auto -mt-24', props.class)">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
