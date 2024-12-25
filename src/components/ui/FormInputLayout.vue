<script setup lang="ts">
import { FormLabel } from '@/components/ui/form'
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  name: string
  class?: HTMLAttributes['class']
}>()
</script>
<template>
  <div
    :class="
      cn(
        'flex flex-col items-start md:grid md:grid-cols-4 w-full md:gap-5 gap-2.5 md:items-center text-right',
        props.class
      )
    "
  >
    <div class="col-span-1">
      <FormLabel class="w-fit">{{ name }}</FormLabel>
    </div>
    <div class="col-span-3 w-full">
      <slot />
    </div>
  </div>
</template>
