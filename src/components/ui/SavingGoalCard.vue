<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { format } from 'date-fns'

const props = defineProps<{
  img?: string
  title?: string
  description?: string
  endDate?: Date
  target: number
  progress: number
}>()
</script>
<template>
  <Card class="w-full h-full bg-card-solid cursor-pointer md:px-7 md:py-2" shade>
    <CardHeader>
      <div
        class="rounded-3xl overflow-hidden items-center place-content-center w-full h-20 bg-muted"
        :style="{
          backgroundImage: `url(${props.img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }"
      />

      <CardTitle>{{ title }}</CardTitle>
      <CardDescription>{{ description }}</CardDescription>
    </CardHeader>

    <CardContent class="flex w-full gap-5 flex-col">
      <div class="place-content-center">
        <h2 class="font-bold">Sluttdato</h2>
        {{ format(endDate ?? '', 'dd-MM-yyyy') }}
      </div>
      <div class="flex w-full flex-col">
        <span class="scroll-m-20 text-base font-semibold text-muted-foreground tracking-tight text-nowrap">
          {{ progress }} / {{ target }}kr
        </span>
        <Progress :max="100" :model-value="target == 0 ? 0 : (progress / target) * 100" />
      </div>
    </CardContent>
  </Card>
</template>
