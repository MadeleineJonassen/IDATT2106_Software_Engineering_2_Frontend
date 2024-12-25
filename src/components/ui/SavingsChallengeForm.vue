<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import SavingsGoalDropdown from '@/components/ui/Dropdown.vue'
import { format } from 'date-fns'
import type { SavingGoalDtoGeneralResponse, TransactionCategoryDto } from '@/lib/api'
import { computed, ref, watch } from 'vue'
import FormInput from '@/components/ui/form/FormInput.vue'
import { Card } from '@/components/ui/card'
import type { BankAccountControllerService } from '@/lib/api'
import { useRoute } from 'vue-router'
import { useAuth0 } from '@auth0/auth0-vue'
import { useExpectedExpense } from '@/lib/composables/bankAccounts'
import CalendarInput from '@/components/ui/CalendarInput.vue'

const zodSchema = z.object({
  earlierExpenses: z.number().min(0),
  challengeSum: z.number().min(0),
  startDate: z.string().min(0),
  endDate: z.string().min(0),
  savingsGoal: z.number()
})

const props = defineProps<{
  goals: SavingGoalDtoGeneralResponse[]
  category: TransactionCategoryDto
}>()

const formSchema = toTypedSchema(zodSchema)

export type formType = z.infer<typeof zodSchema>

const emit = defineEmits<{
  submitForm: [formType]
}>()

const form = useForm({
  validationSchema: formSchema
})

const handleSubmit = form.handleSubmit((values) => {
  //TODO: Handle form submission here
  emit('submitForm', values)
})

//Get previous expenses from backend
//const earlierDailyExpense = getEarlierExpense()
//import from '@lib/compostables/...'
//Calculate days in saving challenge, multiply
const route = useRoute()
const auth0 = useAuth0()

const selectedGoalAccount = computed(() => {
  return props.goals.find((g) => g.id === form.values.savingsGoal)?.sourceBankAccount?.id
})

const categoryId = computed(() => props.category.id)

const expectedExpense = useExpectedExpense(categoryId, selectedGoalAccount)

watch(expectedExpense.data, () => {
  form.setFieldValue('earlierExpenses', (expectedExpense.data.value?.projectedExpense ?? 0) * 7)
})

const expenseSuggestion = computed(() => {
  const dailyAmt = 50

  const daysInChallenge = 7 //new Date(form.values.endDate as string).getTime() - new Date(form.values.startDate as string).getTime()
  return dailyAmt * daysInChallenge
})

form.setValues({
  earlierExpenses: expenseSuggestion.value, //TODO: fetch previous expenses from backend
  challengeSum: 0,
  startDate: format(new Date(), 'yyyy-MM-dd'),
  endDate: format(new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), 'yyyy-MM-dd')
})

const formatted = computed(() => {
  const obj: { value: number; label: string }[] = []

  if (!props.goals) return

  props.goals.forEach((e) => {
    obj.push({
      label: e.title ?? '',
      value: e.id ?? 0
    })
  })

  return obj
})

const savingsSum = computed(() => {
  const earlierExpenses = Number(form.values.earlierExpenses)
  const challengeSum = Number(form.values.challengeSum)

  if (isNaN(earlierExpenses) || isNaN(challengeSum)) {
    //return 0 if NaN
    return 0
  }

  return earlierExpenses - challengeSum
})
</script>
<template>
  <form @submit.prevent="handleSubmit" class="flex gap-5 items-start md:flex-row flex-col">
    <div class="w-full">
      <div class="flex flex-col gap-4 md:flex-row">
        <div class="flex gap-2.5 flex-col w-full">
          <FormInput
            name="earlierExpenses"
            label="Tidligere ukesforbruk"
            type="number"
            readonly="readonly"
          />
          <FormInput name="challengeSum" label="Forbruksmål" type="number" />
          <SavingsGoalDropdown
            name="savingsGoal"
            :values="form.values"
            :options="formatted ?? []"
            label="Sparemål"
            :set-values="form.setValues"
          />
          <CalendarInput
            :set-values="form.setValues"
            :values="form.values"
            name="startDate"
            label="Startdato"
          />
          <CalendarInput
            :set-values="form.setValues"
            :values="form.values"
            name="endDate"
            label="Sluttdato"
          />
        </div>
      </div>
      <DialogFooter class="mt-5">
        <Button @click="handleSubmit" data-testid="modal-save" class="w-full md:w-fit">
          Opprett spareutfordring
        </Button>
      </DialogFooter>
    </div>
    <div class="content-center md:w-fit w-full">
      <Card class="bg-card-solid shadow-none w-full">
        <div class="">
          <div class="text-xs text-muted-foreground text-nowrap">Du vil spare</div>
          <div class="font-bold">{{ savingsSum }} kr!</div>
        </div>
      </Card>
    </div>
  </form>
</template>
