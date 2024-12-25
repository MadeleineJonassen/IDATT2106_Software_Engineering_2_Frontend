<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { ProgressIndicator, ProgressRoot, type ProgressRootProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = withDefaults(
  defineProps<
    ProgressRootProps & { class?: HTMLAttributes['class'] } & { indicatorColor?: string }
  >(),
  {
    modelValue: 0,
    indicatorColor: ''
  }
)

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <ProgressRoot
    v-bind="delegatedProps"
    :class="
      cn(
        'relative h-4 w-full overflow-hidden rounded-full shadow-inner bg-secondary',
        props.class,
      )
    "
  >
    <ProgressIndicator
      :class="
        cn('h-full w-full flex-1 bg-primary transition-all rounded-full shadow-lg', props.indicatorColor)
      "
      :style="`transform: translateX(-${100 - (props.modelValue ?? 0)}%);`"
    />
  </ProgressRoot>
</template>
