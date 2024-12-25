<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Primitive, type PrimitiveProps } from 'radix-vue'
import { buttonShadowVariants, type ButtonVariants, buttonVariants } from '.'
import { cn } from '@/lib/utils'

interface Props extends PrimitiveProps {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
  shadow?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
  shadow: true
})
</script>

<template>
  <div :class="cn('relative w-fit', props.class)">
    <Primitive
      :as="as"
      :as-child="asChild"
      :class="
        cn(
          shadow ? 'active:translate-x-1 active:translate-y-1' : undefined,
          buttonVariants({ variant, size }),
          'border-border z-10 relative transition-all w-full h-full',
          props.class
        )
      "
    >
      <slot />
    </Primitive>
    <div v-if="shadow" :class="cn(buttonShadowVariants({ variant }), 'w-full')" />
  </div>
</template>
