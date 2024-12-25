<script setup lang="ts">
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface Props {
  active?: boolean
}

defineProps<Props>()
</script>
<template>
  <div class="relative w-fit h-full flex items-center">
    <Button
      v-bind="$attrs"
      variant="ghost"
      size="sm"
      class="header-button relative"
      :shadow="false"
      :class="{
        selected: active
      }"
    >
      <slot />
    </Button>
    <div
      :class="
        cn(
          'w-1/2 bg-background absolute top-0 left-1/2 -translate-x-1/2 h-1 rounded-b-md',
          active ? 'block' : 'hidden'
        )
      "
    />
  </div>
</template>
