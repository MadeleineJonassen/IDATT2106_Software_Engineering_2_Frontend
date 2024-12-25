<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import SavingsProgress from '@/components/ui/SavingsProgress.vue'
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import type { SavingGoalDtoGeneralResponse } from '@/lib/api'

export type SavingGoal = {
  title: string
  target: number
  current: number
}

interface Props {
  title: string
  values: SavingGoalDtoGeneralResponse[]
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Sparemål'
})
</script>
<template>
  <Card :class="cn('w-full flex flex-col', props.class)">
    <CardHeader>
      <CardTitle>{{ title }}</CardTitle>
    </CardHeader>
    <CardContent
      class="flex gap-5 flex-col"
      :class="!values?.length ? 'place-content-center items-center h-full' : undefined"
    >
      <SavingsProgress
        v-for="(goal, n) in values"
        :key="n"
        :title="goal?.title"
        :target="goal?.goalSum"
        :current="10"
      />
      <span v-if="!values?.length">Her var det lite 😔</span>
    </CardContent>
  </Card>
</template>
