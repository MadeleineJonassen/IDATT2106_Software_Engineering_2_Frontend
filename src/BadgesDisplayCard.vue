<script setup lang="ts">
import type { CompletedBadgeDto } from '@/lib/api'
import TrophyIcon from '@/components/icons/TrophyIcon.vue'

import { type StatcardVariants, statcardVariants } from '@/components/ui/statcard'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

defineProps<{
  badges: CompletedBadgeDto[]
  variant?: StatcardVariants['variant']
}>()
</script>
<template>
  <div :class="statcardVariants({ variant })" class="md:max-w-52">
    <ScrollArea class="w-full">
      <div v-if="badges.length > 0" class="flex flex-row w-full items-center">
        <TrophyIcon
          class="w-7 h-7"
          :key="badge.id"
          v-for="badge in badges"
          :tier="badge.tier ?? 0"
          :type="badge.id ?? 0"
        />
      </div>
      <div v-else>ingen badges</div>
      <ScrollBar orientation="horizontal" v-show="false" />
    </ScrollArea>
  </div>
</template>
