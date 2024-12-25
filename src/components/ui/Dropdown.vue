<script setup lang="ts">
import { Check, ChevronsUpDown } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { computed } from 'vue'
import FormInputLayout from '@/components/ui/FormInputLayout.vue'

const props = defineProps<{
  setValues: (values: Record<string, any>) => void
  values: Record<string, any>
  options: {
    label?: string
    value?: number
  }[]
  name: string
  label?: string
}>()

const model = defineModel<{
  value: string
}>()

const displayText = computed(() => {
  return props.values[props.name]
    ? props.options?.find((val: any) => val?.value === props.values[props.name])?.label ??
        'Velg alternativ'
    : 'Velg...'
})
</script>

<template>
  <FormField :name="name">
    <FormInputLayout :name="label as string">
      <FormItem class="">
        <Popover>
          <PopoverTrigger as-child>
            <FormControl>
              <Button
                variant="outline"
                role="combobox"
                :class="
                  cn('w-full justify-between items-start', !values[name] && 'text-muted-foreground')
                "
                @click.prevent
                :shadow="false"
              >
                {{ displayText }}
                <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent class="w-full p-0">
            <Command>
              <CommandInput placeholder="Søk..." />
              <CommandEmpty>Ingenting er funnet</CommandEmpty>
              <CommandList>
                <CommandGroup>
                  <CommandItem
                    v-for="val in options"
                    :key="val.value"
                    :value="val.label ?? ''"
                    @select="
                      () => {
                        const value = {
                          [name]: val.value
                        }
                        setValues(value)
                      }
                    "
                  >
                    <Check
                      :class="
                        cn('mr-2 h-4 w-4', val.value === values[name] ? 'opacity-100' : 'opacity-0')
                      "
                    />
                    {{ val.label }}
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </FormItem>
    </FormInputLayout>
  </FormField>
</template>
