<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import PageWrapper from '@/components/ui/PageWrapper.vue'
import { useRoute } from 'vue-router'
import { useAuth0 } from '@auth0/auth0-vue'
import { useSavingGoal, useUpdateSavingGoal } from '@/lib/composables/savingGoal'
import { ref, watch } from 'vue'
import { CheckIcon, Sparkles } from 'lucide-vue-next'
import SavingsChallengeCard from '@/components/ui/SavingsChallengeCard.vue'
import {
  getChallengeSuggestions,
  useGoalChallenges,
  useMutateSavingChallenge,
  useTransferToGoal
} from '@/lib/composables/savingChallenge'
import GenerateSavingChallenge from '@/components/ui/GenerateSavingChallenge.vue'
import { Skeleton } from '@/components/ui/skeleton'
import { useBankAccounts } from '@/lib/composables/bankAccounts'
import FormInput from '@/components/ui/form/FormInput.vue'
import Dropdown from '@/components/ui/Dropdown.vue'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import CalendarInput from '@/components/ui/CalendarInput.vue'
import { watchDebounced } from '@vueuse/core'
import SavingIndicator from '@/components/ui/SavingIndicator.vue'
import type { SavingChallengeResponseDto } from '@/lib/api'

const props = defineProps<{
  savingsGoalId: number
}>()

const route = useRoute()
const auth0 = useAuth0()
const mutateChallenge = useMutateSavingChallenge()

const zodObject = z.object({
  title: z.string().min(3).max(50),
  goalSum: z.number().min(0),
  endingDate: z.string().min(1),
  imageUrl: z.string(),
  sourceBankAccountId: z.number(),
  destinationBankAccountId: z.number()
})

const formSchema = toTypedSchema(zodObject)

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    imageUrl:
      'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?cs=srgb&dl=pexels-souvenirpixels-417074.jpg&fm=jp'
  }
})

watchDebounced(
  form.values,
  async () => {
    try {
      const status = await form.validate()
      if (!status.valid) return
      updateGoal.mutate({ savingGoal: form.values })
    } catch (err) {
      console.log(err)
    }
  },
  {
    debounce: 2000
  }
)

const goalId = ref(route.params.goalId as string)
const suggestions = getChallengeSuggestions(goalId)
const goal = useSavingGoal(goalId)
const accounts = useBankAccounts()
const updateGoal = useUpdateSavingGoal(goalId)
const challenges = useGoalChallenges(goalId)
const transferMoney = useTransferToGoal()

watch(
  goal.data,
  () => {
    if (!goal.data.value) return
    form.setValues({
      endingDate: goal.data.value.endingDate as string,
      goalSum: goal.data.value.goalSum,
      sourceBankAccountId: goal.data.value.sourceBankAccount?.id,
      destinationBankAccountId: goal.data.value.destinationBankAccount?.id,
      title: goal.data.value.title
    })
  },
  { immediate: true }
)

const handleAddChallenge = (challenge: SavingChallengeResponseDto) => {
  mutateChallenge.mutate({
    challenge: {
      categoryId: challenge.transactionCategory?.id,
      endingDate: challenge.endingDate,
      spendingGoal: challenge.spendingGoal,
      startDate: challenge.startDate,
      expectedExpense: challenge.expectedExpense
    },
    goalId: goalId.value
  })
}

const doTransfer = (challengeId: number) => {
  transferMoney.mutate({
    challengeId
  })
}
</script>
<template>
  <PageWrapper title="Sparemål">
    <Card class="w-fit mx-auto flex gap-5 md:flex-row flex-col md:items-start items-center">
      <CardHeader>
        <div
          class="aspect-square overflow-hidden rounded-full flex items-center xl:w-80 w-40 relative group cursor-pointer"
        >
          <img
            alt="Sparemålsbilde"
            :src="
              form.values.imageUrl ??
              'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?cs=srgb&dl=pexels-souvenirpixels-417074.jpg&fm=jpg'
            "
            class="object-cover h-full"
          />
        </div>
      </CardHeader>
      <div>
        <CardHeader>
          <CardTitle>Informasjon om ditt sparemål</CardTitle>
          <CardDescription>Se status på sparemålet ditt, eller gjør endringer</CardDescription>
          <div>
            <Progress
              :max="100"
              :model-value="
                ((goal.data.value?.amountSaved ?? 0) / (goal.data.value?.goalSum ?? 1)) * 100
              "
            />
            <label class="text-sm font-medium leading-none">
              {{ goal.data.value?.amountSaved }} / {{ goal.data.value?.goalSum }} kr
            </label>
          </div>
        </CardHeader>
        <CardContent>
          <form @submit.prevent="">
            <Card class="bg-card-solid flex flex-col gap-2.5">
              <FormInput name="title" label="Tittel" />
              <FormInput name="description" label="Beskrivelse" disabled />
              <FormInput name="goalSum" label="Målsum" type="number" />
              <CalendarInput
                name="endingDate"
                label="Sluttdato"
                :values="form.values"
                :set-values="form.setValues"
              />
              <Dropdown
                :set-values="form.setValues"
                :values="form.values"
                name="sourceBankAccountId"
                label="Fra konto"
                :options="
                  accounts.data.value?.map((e) => {
                    return {
                      label: e.name,
                      value: e.id
                    }
                  }) ?? []
                "
              />
              <Dropdown
                :set-values="form.setValues"
                :values="form.values"
                name="destinationBankAccountId"
                label="Til konto"
                :options="
                  accounts.data.value?.map((e) => {
                    return {
                      label: e.name,
                      value: e.id
                    }
                  }) ?? []
                "
              />
              <SavingIndicator
                class="ml-auto mt-5"
                :is-error="!!updateGoal.error.value"
                :is-saving="updateGoal.isPending.value"
              />
            </Card>
          </form>
        </CardContent>
        <CardHeader>
          <CardTitle>Spareutfordringer</CardTitle>
          <CardDescription>Spareutfordringer tilknyttet ditt sparemål</CardDescription>
        </CardHeader>
        <CardContent>
          <h4 class="scroll-m-20 text-xl font-semibold tracking-tight flex gap-2.5 items-center">
            <CheckIcon />
            Eksisterende utfordringer
          </h4>
          <div class="flex gap-2.5 flex-col mt-2.5">
            <SavingsChallengeCard
              v-for="(challenge, n) in challenges.data.value"
              :challenge="challenge"
              :key="n"
              @transfer="() => doTransfer(challenge.id as number)"
            />
            <Card
              v-if="!goal.data.value?.savingChallenges?.length"
              class="flex items-center place-content-center"
            >
              <span>Vi har lett overalt, men fant ingenting...</span>
            </Card>
            <template v-if="suggestions.isLoading.value">
              <Skeleton
                class="w-full h-80 rounded-3xl"
                v-for="(n, i) in Array(1).fill(null)"
                :key="i"
              />
            </template>
          </div>
          <h4
            class="scroll-m-20 text-xl font-semibold tracking-tight flex gap-2.5 items-center mt-7"
          >
            <Sparkles />
            Automatiske forslag
          </h4>
          <div class="flex gap-2.5 flex-col mt-2.5">
            <GenerateSavingChallenge
              v-for="(challenge, n) in suggestions.data.value"
              :key="n"
              :new-expenditure="challenge.spendingGoal?.toString() ?? ''"
              :end-date="challenge.endingDate ?? ''"
              :old-expenditure="challenge.expectedExpense?.toString() ?? ''"
              :category="challenge.transactionCategory?.name?.toLowerCase() ?? ''"
              :start-date="challenge.startDate ?? ''"
              :difference="
                ((challenge.expectedExpense ?? 0) - (challenge.spendingGoal ?? 0)).toString()
              "
              @add-challenge="() => handleAddChallenge(challenge)"
            />
            <Card
              v-if="!suggestions.data.value?.length"
              class="flex items-center place-content-center"
            >
              <span>Det ser ut til at du har spart alt du kan 💸</span>
            </Card>
            <template v-if="suggestions.isLoading.value">
              <Skeleton
                class="w-full h-80 rounded-3xl"
                v-for="(n, i) in Array(1).fill(null)"
                :key="i"
              />
            </template>
          </div>
        </CardContent>
      </div>
    </Card>
  </PageWrapper>
</template>

<style scoped></style>
