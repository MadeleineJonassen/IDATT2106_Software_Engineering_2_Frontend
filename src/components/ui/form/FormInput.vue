<script setup lang="ts">
import { FormControl, FormField, FormItem } from '@/components/ui/form/index'
import { Input } from '@/components/ui/input'
import FormInputLayout from '@/components/ui/FormInputLayout.vue'

const props = withDefaults(
  defineProps<{
    name: string
    label: string
    type?: 'text' | 'number' | 'date'
    placeholder?: string
    disabled?: boolean
    readonly?: string
  }>(),
  {
    type: 'text'
  }
)
</script>
<template>
  <FormField v-slot="{ componentField }" :name="name">
    <FormItem>
      <FormInputLayout :name="label">
        <FormControl>
          <Input :type="type" v-bind="componentField" :disabled="disabled" :readonly="readonly" />
        </FormControl>
      </FormInputLayout>
    </FormItem>
  </FormField>
</template>
