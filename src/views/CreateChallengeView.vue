<script setup lang="ts">
import PageWrapper from '@/components/ui/PageWrapper.vue'
import { Card } from '@/components/ui/card'
import { ref } from 'vue'
import { useSavingGoals } from '@/lib/composables/savingGoal'
import SavingsChallengeFormWrapper from '@/components/ui/SavingsChallengeFormWrapper.vue'
import SavingsChallengeSelectCategory from '@/components/ui/SavingsChallengeSelectCategory.vue'
import { useChallengeCategories } from '@/lib/composables/challengeCategory'
import type { formType } from '@/components/ui/SavingsChallengeForm.vue'
import { useMutateSavingChallenge } from '@/lib/composables/savingChallenge'
import { useToast } from '@/components/ui/toast'
import type {SavingChallengeRequestDto, TransactionCategoryDto} from '@/lib/api'
import { useRouter } from 'vue-router'

const open = ref(false)
const { data: savingGoals } = useSavingGoals()

const page = ref(0)
const selectedCategory = ref<number>()
const categories = useChallengeCategories()
const mutateChallenge = useMutateSavingChallenge()
const { toast } = useToast()
const router = useRouter()
const nextPage = () => {
  page.value += 1
}

const selectCategory = (selected: number) => {
  selectedCategory.value = selected
  nextPage()
}
const handleSubmit = (data: formType) => {
  const obj: SavingChallengeRequestDto = {
    categoryId: selectedCategory.value,
    startDate: data.startDate,
    endingDate: data.endDate,
    expectedExpense: data.challengeSum,
    spendingGoal: data.savingsGoal
  }
  mutateChallenge
    .mutateAsync({
      challenge: { ...obj },
      goalId: data.savingsGoal.toString()
    })
    .then((res) => {
      toast({
        title: 'Vellykket!',
        description: 'Spareutfordringen ble opprettet'
      })

      router.push({ name: 'saving_challenges' })
    })
    .catch((err) => {
      console.log(err)
      toast({
        title: 'Feil',
        description: 'Noe gikk galt',
        variant: 'destructive'
      })
    })
}

// Temporary view for creating saving challenges
</script>

<template>
  <PageWrapper title="Opprett utfordring">
    <Card class="w-fit md:min-w-fit min-w-full mx-auto animate-slide-in">
      <SavingsChallengeSelectCategory
        v-if="page === 0"
        @item-selected="selectCategory"
        :categories="categories.data.value"
      />
      <SavingsChallengeFormWrapper
        v-if="page === 1"
        @submit-form="handleSubmit"
        :selectedCategory="
          categories.data.value?.find((e) => e.id === selectedCategory) as TransactionCategoryDto
        "
        :goals="savingGoals ?? []"
      />
    </Card>
  </PageWrapper>
</template>
