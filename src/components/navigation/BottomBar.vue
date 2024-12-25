<script setup lang="ts">
import { Card } from '@/components/ui/card'
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import BottomBarButton from '@/components/ui/BottomBarButton.vue'
import { useRouter } from 'vue-router'

interface Props {
  class?: HTMLAttributes['class']
  navButtons?: {
    label: string
    icon: any
    name: string
  }[]
}

const router = useRouter()

const goToPage = (name: string) => {
  router.push({ name })
}

const props = defineProps<Props>()
</script>
<template>
  <Teleport to="body">
    <Card :class="cn('w-11/12 h-fit grid grid-cols-3 gap-5 py-1', props?.class)">
      <BottomBarButton
        v-for="(b, n) in navButtons"
        :key="n"
        :active="router.currentRoute.value.name === b.name"
        @click="() => goToPage(b.name)"
      >
        <template #icon>
          <component :is="b.icon" class="w-6 h-6" />
        </template>
        {{ b.label }}
      </BottomBarButton>
    </Card>
  </Teleport>
</template>
