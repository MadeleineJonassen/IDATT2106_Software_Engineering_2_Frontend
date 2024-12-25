<script setup lang="ts">
import { Button } from '@/components/ui/button'

const props = defineProps<{
  active?: boolean
}>()
</script>
<template>
  <Button variant="ghost" class="w-full">
    <div class="flex flex-col items-center">
      <div
        class="w-fit p-1 rounded-lg"
        :class="active ? 'bg-background text-secondary-foreground' : undefined"
      >
        <slot name="icon" />
      </div>
      <span>
        <slot name="default" />
      </span>
    </div>
  </Button>
</template>
