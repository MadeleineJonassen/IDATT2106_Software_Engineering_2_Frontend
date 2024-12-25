<script setup lang="ts">
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Trophy } from 'lucide-vue-next'
import TrophyItem, { type TrophyProps } from '@/components/ui/TrophyItem.vue'

interface Props {
  trophies: TrophyProps[]
}

const props = defineProps<Props>()
</script>
<template>
  <Card>
    <CardHeader>
      <h1 class="text-2xl font-semibold flex items-center gap-2.5"><Trophy /> Troféer</h1>
    </CardHeader>
    <CardContent class="flex flex-col gap-5">
      <TrophyItem
        v-for="(trophy, n) in trophies"
        :key="n"
        v-bind="trophy"
        :display-tier-labels="false"
      />
    </CardContent>
  </Card>
</template>
