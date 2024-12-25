<script setup lang="ts">
import PageWrapper from '@/components/ui/PageWrapper.vue'
import { useSavingGoal, useSavingGoals } from '@/lib/composables/savingGoal'
import TrophyCard from '@/components/ui/TrophyCard.vue'
import Leaderboard from '@/components/ui/Leaderboard.vue'
import { useLeaderboard } from '@/lib/composables/leaderboard'
import SavingGoalsCardDashboard from '@/components/ui/SavingGoalsCardDashboard.vue'
import { ref, watch } from 'vue'
import { useUserTrophies } from '@/lib/composables/trophies'
import { filterDoneBadges, filterInProgressBadges } from '@/lib/utils'

const detailedTrophies = useUserTrophies()

const doneTrophies = filterDoneBadges(detailedTrophies.data)

const leaderboard = useLeaderboard()

const goals = useSavingGoals()
const activeGoalId = ref<string>()
const { data: activeGoal } = useSavingGoal(activeGoalId)

const setNewActiveGoal = (id: string) => {
  activeGoalId.value = id
}

watch(
  [goals.data, activeGoalId],
  () => {
    if (goals.data.value === undefined) return
    if (goals.data.value.length === 0) return
    if (activeGoalId.value !== undefined) return
    setNewActiveGoal(goals.data.value[0].id?.toString() ?? '')
  },
  { immediate: true }
)
</script>
<template>
  <PageWrapper>
    <div class="grid md:grid-cols-2 gap-5 grid-cols-1">
      <SavingGoalsCardDashboard
        @changeActiveGoal="setNewActiveGoal"
        class="row-span-2"
        :saving-goals="goals.data.value || []"
        :active-saving-goal="activeGoal ?? {}"
      />
      <TrophyCard :trophies="doneTrophies" />
      <Leaderboard :users="leaderboard.data.value ?? []"> </Leaderboard>
    </div>
  </PageWrapper>
</template>
