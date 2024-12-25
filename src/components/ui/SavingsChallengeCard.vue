<script setup lang="ts">
import { Progress } from '@/components/ui/progress'
import { SavingChallengeResponseDto } from '@/lib/api'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { useTransferToGoal } from '@/lib/composables/savingChallenge'
import { cn } from '@/lib/utils'

const props = defineProps<{
  challenge: SavingChallengeResponseDto
}>()

const emit = defineEmits(['transfer'])
</script>

<template>
  <div
    class="flex flex-col gap-5 bg-card-solid p-3"
    :class="
      cn(
        challenge?.state === 'COMPLETED' ? 'rounded-3xl' : 'rounded-full',
        challenge?.state === 'FAILED' ? 'opacity-50 pointer-events-none' : undefined,
        challenge?.state === 'COMPLETED_AND_TRANSFERRED' ? 'bg-green-400/20' : undefined
      )
    "
  >
    <div class="grid grid-cols-3 gap-2.5 md:px-7 w-full min-w-36 place-content-center items-center">
      <p>Bruke {{ challenge?.spendingGoal }},- på {{ challenge?.transactionCategory?.name }}</p>
      <div
        class="text-accent-foreground font-semibold text-right"
        v-if="challenge?.startDate && challenge?.endingDate"
      >
        {{ format(challenge?.startDate ?? '', 'dd.MM.yy') }}-{{
          format(challenge?.endingDate ?? '', 'dd.MM.yy')
        }}
      </div>
      <div class="flex place-content-end">
        <Progress
          :max="100"
          :model-value="((challenge.currentSpending ?? 0) / (challenge.spendingGoal ?? 1)) * 100"
          class="w-32 h-3"
        />
      </div>
    </div>
    <div
      class="p-5 flex flex-col gap-2.5 bg-accent rounded-xl text-center"
      v-if="challenge.state == 'COMPLETED'"
    >
      <small class="text-sm font-medium leading-none">
        Du har spart {{ challenge.amountSaved }},- på denne utfordringen!
      </small>
      <Button @click="() => emit('transfer')" class="w-full">Overfør til sparemål</Button>
    </div>
  </div>
</template>

<style scoped></style>
