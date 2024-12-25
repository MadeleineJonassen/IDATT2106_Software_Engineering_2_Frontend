<script setup lang="ts">
import { Button } from '@/components/ui/button'
import Dropdown from '@/components/ui/Dropdown.vue'
import { useUpdateuser } from '@/lib/composables/user'
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import type { BankAccountDto } from '@/lib/api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const props = defineProps<{
  accounts?: BankAccountDto[]
}>()

const zodObject = z.object({
  sourceBankAccountId: z.number(),
  destinationBankAccountId: z.number()
})

const formSchema = toTypedSchema(zodObject)

const form = useForm({
  validationSchema: formSchema
})

const emit = defineEmits(['submit'])

const submitHandler = form.handleSubmit((values) => {
  emit('submit', values)
})

export type formTypes = z.infer<typeof zodObject>
</script>
<template>
  <Card class="w-fit mx-auto">
    <CardHeader>
      <CardTitle> Velg dine foretrukne kontoer </CardTitle>
      <CardDescription>
        Vennligst velg dine foretrukne kontoer, slik at vi kan velge de for deg når du lager et
        sparemål
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form @submit.prevent="submitHandler" class="flex flex-col gap-2.5">
        <Dropdown
          :options="accounts?.map((account) => ({ label: account.name, value: account.id })) ?? []"
          label="Fra konto"
          name="sourceBankAccountId"
          :set-values="form.setValues"
          :values="form.values"
        />
        <Dropdown
          :options="accounts?.map((account) => ({ label: account.name, value: account.id })) ?? []"
          label="Til konto"
          name="destinationBankAccountId"
          :set-values="form.setValues"
          :values="form.values"
        />
        <Button size="lg" type="submit" class="ml-auto"> Neste </Button>
      </form>
    </CardContent>
  </Card>
</template>
