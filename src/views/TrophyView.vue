<template>
  <PageWrapper title="Troféer">
    <Card class="flex flex-col gap-5">
      <TrophyListWrapper title="Opptjente troféer" :trophies="finishedBadges" />
      <TrophyListWrapper title="Påbegynte troféer" :trophies="inProgressBadges" />
      <TrophyListWrapper title="Skjulte troféer" :trophies="notStartedBadges" />
    </Card>
  </PageWrapper>
</template>
<script setup lang="ts">
import PageWrapper from '@/components/ui/PageWrapper.vue'
import { Card } from '@/components/ui/card'
import { type TrophyProps } from '@/components/ui/TrophyItem.vue'
import { useAllTrophies, useUserTrophies } from '@/lib/composables/trophies'
import TrophyListWrapper from '@/components/ui/TrophyListWrapper.vue'
import { computed } from 'vue'
import { filterDoneBadges, filterInProgressBadges } from '@/lib/utils'

const detailProgress = useUserTrophies()
const allTrophies = useAllTrophies()

const finishedBadges = filterDoneBadges(detailProgress.data)
const inProgressBadges = filterInProgressBadges(detailProgress.data)

const notStartedBadges = computed<TrophyProps[]>(() => {
  return allTrophies?.data.value
    ?.filter(
      (badge) =>
        !detailProgress.data.value?.find((userBadge) => userBadge.badgeDto?.id === badge.id)
    )
    .map((badge) => {
      return {
        tiers: badge.badgeTiers,
        description: badge.description,
        target: badge.badgeTiers?.[badge.badgeTiers.length - 1]?.target ?? 0,
        type: badge.id,
        title: badge.name
      }
    }) as TrophyProps[]
})
</script>
