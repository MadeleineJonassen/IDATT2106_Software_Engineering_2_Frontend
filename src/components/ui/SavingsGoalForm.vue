<script setup lang="ts">
import { DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import SavingsGoalDropdown from '@/components/ui/Dropdown.vue'
import type { BankAccountDto } from '@/lib/api'
import { computed, type Ref, watch } from 'vue'
import FormInput from '@/components/ui/form/FormInput.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import Dropdown from '@/components/ui/Dropdown.vue'
import CalendarInput from '@/components/ui/CalendarInput.vue'

const props = defineProps<{
  accounts?: Ref<BankAccountDto[]>
  isLoading?: boolean
  defaultValues?: formType
}>()

const zodObject = z.object({
  title: z.string().min(3).max(50),
  description: z.string(),
  goalSum: z.number().min(0),
  endingDate: z.string().min(6), //TODO: endre til kalender
  destinationBankAccountId: z.number().min(0),
  sourceBankAccountId: z.number().min(0)
})

const formSchema = toTypedSchema(zodObject)
export type formType = z.infer<typeof zodObject>

const form = useForm({
  validationSchema: formSchema
})

watch(
  () => props.defaultValues,
  () => {
    if (!props.defaultValues) return
    form.setValues(props.defaultValues)
  },
  { immediate: true }
)
//form.setValues(props.defaultValues ?? {})

const emit = defineEmits(['submit-form'])

const handleSubmit = form.handleSubmit((values) => {
  //TODO: Handle form submission here
  emit('submit-form', values)
})

const mappedAccounts = computed(() => {
  return props.accounts?.value?.map((account) => {
    return {
      value: account.id,
      label: account.name
    }
  })
})
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="grid gap-4 py-4">
      <FormInput name="title" label="Navn*" placeholder="Velg navn" />
      <FormInput name="description" label="Beskrivelse" placeholder="Lag en beskrivelse!" />

      <Dropdown
        label="Overfør fra konto"
        :set-values="form.setValues"
        :values="form.values"
        :options="mappedAccounts ?? []"
        name="sourceBankAccountId"
      />
      <Dropdown
        label="Overfør til konto"
        :set-values="form.setValues"
        :values="form.values"
        :options="mappedAccounts ?? []"
        name="destinationBankAccountId"
      />
      <FormInput name="goalSum" type="number" label="Målsum*" placeholder="Velg beløp" />
      <CalendarInput
        :set-values="form.setValues"
        :values="form.values"
        name="endingDate"
        label="Måldato"
      />
    </div>
    <DialogFooter>
      <Button type="submit" data-testid="modal-save" class="md:w-fit w-full" :disabled="isLoading">
        <template v-if="!isLoading">Opprett sparemål</template>
        <template v-if="isLoading"><LoadingSpinner /></template>
      </Button>
    </DialogFooter>
  </form>
</template>
