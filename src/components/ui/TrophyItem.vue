<script setup lang="ts">
import { badgeMap } from '@/lib/utils'
import { Progress } from '@/components/ui/progress'
import TierLabel from '@/components/ui/TierLabel.vue'
import TrophyIcon from '@/components/icons/TrophyIcon.vue'
import type { BadgeTierDto } from '@/lib/api'
import { computed } from 'vue'

type Tier = {
  // Where on the progress bare should this badge lie?
  progress: number
  // What tier is the badge?
  tier: number

  // How does one achieve this badge tier?
  description: string
}
export interface TrophyProps {
  // Title of the trophy
  title: string
  // Description of the trophy. This is displayed if there are no tiers.
  description?: string
  // Progress and tiers are mutually inclusive. If progress is set, tiers should be set as well
  progress?: number
  // Target is the goal of the progress bar. If target is set, progress should be set as well
  target?: number
  // Tiers are the different levels of the trophy. If tiers are set, progress should be set as well
  tiers?: BadgeTierDto[]
  // What type is the badge? This is used for identifying the badge
  type: number
  // Whether to display the tier labels beneath the progress bar
  displayTierLabels?: boolean
}
const props = withDefaults(defineProps<TrophyProps>(), {
  displayTierLabels: true
})

const progressBar = computed(() => props.tiers && props.tiers.length > 0)
</script>
<template>
  <div class="flex w-full flex-row gap-5">
    <img
      :src="`/badges/${badgeMap[props.type?.toString()] as string}`"
      class="w-16 h-16"
      alt="Badge icon"
    />
    <div class="flex flex-col w-full">
      <h4 class="scroll-m-20 text-xl font-semibold tracking-tight">{{ title }}</h4>
      <span v-if="!progressBar && description" class="leading-7">{{ description }}</span>
      <div class="w-full flex flex-col relative mt-2.5" v-if="progressBar">
        <Progress :max="100" :model-value="((progress ?? 0) / (target ?? 1)) * 100" />
        <div class="absolute top-0 left-0 w-full h-4">
          <TrophyIcon
            v-for="(tier, n) in tiers"
            :type="type"
            :tier="tier.tier as number"
            :key="n"
            class="absolute -translate-x-1/2 top-1/2 -translate-y-1/2 hover:scale-[2] hover:rotate-12 active:scale-150 cursor-pointer transition-transform"
            :style="{
              left: `${Math.round(((tier.target ?? 0) / (target ?? 1)) * 100)}%`
            }"
          />
        </div>
        <div class="px-2 mt-5 flex flex-col gap-2.5" v-if="displayTierLabels">
          <TierLabel
            :tier="tier.tier as number"
            :label="tier.description ?? ''"
            :type="type"
            v-for="(tier, n) in tiers"
            :key="n"
          />
        </div>
      </div>
    </div>
  </div>
</template>
