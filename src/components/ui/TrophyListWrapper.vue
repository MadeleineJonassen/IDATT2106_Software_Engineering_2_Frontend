<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import TrophyItem, { type TrophyProps } from '@/components/ui/TrophyItem.vue'
import { Trophy } from 'lucide-vue-next'

interface Props {
  title?: string
  trophies: TrophyProps[]
}

const props = defineProps<Props>()
</script>
<template>
  <Card class="bg-card-solid shadow-none">
    <CardHeader>
      <CardTitle class="flex gap-2.5 items-center mx-auto"><Trophy /> {{ title }} </CardTitle>
    </CardHeader>
    <CardContent class="flex flex-col gap-5">
      <TrophyItem v-for="(trophy, n) in trophies" :key="n" v-bind="trophy" />
      <small v-if="!trophies?.length" class="text-sm font-medium leading-none mx-auto">
        Uffda, her var det ingenting! Spar mer for å få flere troféer.
      </small>
    </CardContent>
  </Card>
</template>
