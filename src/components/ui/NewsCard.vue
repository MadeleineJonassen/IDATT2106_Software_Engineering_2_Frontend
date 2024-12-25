<script setup lang="ts">
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const props = defineProps<{
  title: string
  img: string
  url: string
  source: string
  isFree: boolean
}>()

const redirect = () => {
  window.open(props.url, '_blank')
}
</script>
<template>
  <Card
    @click="redirect"
    class="bg-card-solid flex gap-5 cursor-pointer shadow-none xl:flex-row flex-col items-center"
    shade
  >
    <div
      class="rounded-full overflow-hidden items-center place-content-center md:w-40 md:h-40 lg:min-h-40 lg:min-w-40 w-20 h-20 min-w-20 min-h-20 aspect-square bg-muted"
      :style="{
        backgroundImage: `url(${props.img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }"
    />
    <div class="flex flex-col gap-2.5">
      <h2
        class="scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight transition-colors first:mt-0 h-fit"
      >
        {{ title }}
      </h2>
      <p>{{ source }}</p>
      <Badge v-if="!isFree" class="w-fit">Abonnement</Badge>
    </div>
  </Card>
</template>
