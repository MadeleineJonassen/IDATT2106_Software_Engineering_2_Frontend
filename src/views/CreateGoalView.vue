<script setup lang="ts">
import PageWrapper from '@/components/ui/PageWrapper.vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useBankAccounts } from '@/lib/composables/bankAccounts'
import SavingsGoalAddVariablesDialog, { type formType } from '@/components/ui/SavingsGoalForm.vue'
import { useMutateSavingGoal } from '@/lib/composables/savingGoal'
import type { BankAccountDto, SavingGoalDtoPost } from '@/lib/api'
import { useToast } from '@/components/ui/toast'
import { useRouter } from 'vue-router'
import { ref, type Ref } from 'vue'
import SavingsGoalForm from '@/components/ui/SavingsGoalForm.vue'

const accounts = useBankAccounts()
const mutateGoals = useMutateSavingGoal()
const { toast } = useToast()
const router = useRouter()
const posting = ref(false)
const handleSubmit = (data: formType) => {
  posting.value = true

  const obj: SavingGoalDtoPost = {
    title: data.title,
    endingDate: data.endingDate,
    destinationBankAccountId: data.destinationBankAccountId,
    goalSum: data.goalSum,
    imageUrl: '',
    sourceBankAccountId: data.sourceBankAccountId
  }
  mutateGoals
    .mutateAsync({
      savingGoal: obj
    })
    .then((res) => {
      toast({
        title: 'Sparemål opprettet',
        description: 'Sparemålet ble opprettet',
        variant: 'default'
      })
      router.push({ name: 'savingGoals' })
    })
    .catch((err) => {
      toast({
        title: 'Feil',
        description: 'En feil oppstod',
        variant: 'destructive'
      })
    })
    .finally(() => (posting.value = false))
}
</script>

<template>
  <PageWrapper>
    <Card class="w-fit mx-auto animate-slide-in">
      <CardHeader>
        <CardTitle>Nytt sparemål</CardTitle>
        <CardDescription>Her kan du opprette et nytt sparemål</CardDescription>
      </CardHeader>
      <CardContent>
        <SavingsGoalForm
          :accounts="accounts.data as Ref<BankAccountDto[]>"
          @submit-form="handleSubmit"
          :is-loading="posting"
        />
      </CardContent>
    </Card>
  </PageWrapper>
</template>
