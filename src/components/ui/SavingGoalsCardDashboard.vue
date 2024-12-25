<script setup lang="ts">
import { type SavingGoalDtoDetailsResponse } from '@/lib/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { computed } from 'vue'
import { Progress } from '@/components/ui/progress'
import SavingGoalsDashboardPopover from '@/components/ui/SavingGoalsDashboardPopover.vue'
import { Label } from '@/components/ui/label'
import { Goal, HandCoins } from 'lucide-vue-next'

interface Props {
  savingGoals: SavingGoalDtoDetailsResponse[]
  activeSavingGoal: SavingGoalDtoDetailsResponse
}
const props = withDefaults(defineProps<Props>(), {
  savingGoals: () => []
})

const emit = defineEmits<{
  (e: 'changeActiveGoal', id: string): void
}>()

const savingGoalProgress = computed(() => {
  if (props.activeSavingGoal.amountSaved === 0 || props.activeSavingGoal.goalSum === 0) return 0
  return (100 * (props.activeSavingGoal.amountSaved ?? 0)) / (props.activeSavingGoal.goalSum ?? 1)
})

const displayNewSavingGoal = (id: string) => {
  emit('changeActiveGoal', id)
}

let colorIndex = 0
const colors = ['bg-green-200', 'bg-amber-200', 'bg-red-200']
const getColor = () => {
  colorIndex = colorIndex === colors.length ? 0 : colorIndex
  return `${colors[colorIndex++]}`
}
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle class="flex flex-row gap-2.5 items-center mx-auto">
        <Goal />
        {{ activeSavingGoal ? activeSavingGoal.title : 'Sparemål' }}
        <SavingGoalsDashboardPopover
          v-if="savingGoals.length > 0"
          :active-goal-id="activeSavingGoal.id?.toString() ?? ''"
          :saving-goals="savingGoals"
          @changeSavingGoal="displayNewSavingGoal"
        />
      </CardTitle>
    </CardHeader>
    <CardContent>
      <!-- Content if there are no saving goals -->
      <div v-if="savingGoals.length === 0">
        <h3 class="scroll-m-20 text-2xl font-semibold tracking-tight text-center">
          Du har ingen sparemål
        </h3>
      </div>
      <!-- Content if there are saving goals -->
      <div v-else class="flex flex-col gap-5" data-test="containerIfSavingGoals">
        <div class="flex flex-col">
          <Progress
            name="savingGoalProgress"
            v-model="savingGoalProgress"
            class="min-h-6 rounded-lg"
          />
          <Label for="savingGoalProgress" class="mx-auto">
            {{ activeSavingGoal.amountSaved ?? 0 }} / {{ activeSavingGoal.goalSum }}
          </Label>
        </div>
        <div class="flex flex-col gap-5">
          <h3
            class="scroll-m-20 text-xl font-semibold tracking-tight mx-auto flex flex-row gap-2.5"
          >
            <HandCoins />Pågående spareutfordringer
          </h3>
          <div v-for="(savingChallenge, n) in activeSavingGoal.savingChallenges" :key="n">
            <p class="leading-7 [&:not(:first-child)]:mt-6">
              {{ savingChallenge.spendingGoal }} kroner på
              {{ savingChallenge.transactionCategory?.name }}
            </p>
            <p class="text-sm text-muted-foreground">
              {{ savingChallenge.currentSpending }} kroner brukt
            </p>
            <Progress
              name="challengeProgress"
              :model-value="
                (100 * (savingChallenge.currentSpending || 0)) / (savingChallenge.spendingGoal || 1)
              "
              class="h-4"
              :indicator-color="getColor()"
            />
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
