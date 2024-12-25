<script setup lang="ts">
import {defineProps} from 'vue'
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import SavingsChallengeForm, { type formType } from '@/components/ui/SavingsChallengeForm.vue'
import { z } from 'zod'
import { type SavingGoalDtoGeneralResponse } from '@/lib/api/models/SavingGoalDtoGeneralResponse'
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type {TransactionCategoryDto} from "@/lib/api";

const props = defineProps<{
  selectedCategory: TransactionCategoryDto
  goals: SavingGoalDtoGeneralResponse[]
}>()

const emit = defineEmits<{
  submitForm: [formType]
}>()

</script>

<template>
  <div class="animate-slide-in">
    <CardHeader>
      <CardTitle>
        {{ props.selectedCategory.name }}
      </CardTitle>
      <CardDescription>Beskriv spareutfordringen din</CardDescription>
    </CardHeader>
    <CardContent>

      <SavingsChallengeForm
        @submit-form="(d: z.infer<typeof formType>) => emit('submitForm', d)"
        :goals="goals" :category="selectedCategory"
      />
    </CardContent>
  </div>
</template>
