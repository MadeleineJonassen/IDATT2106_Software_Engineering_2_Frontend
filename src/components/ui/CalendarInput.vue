<script setup lang="ts">
import { FormControl, FormField, FormItem } from '@/components/ui/form'
import FormInputLayout from '@/components/ui/FormInputLayout.vue'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { computed, ref } from 'vue'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-vue-next'
import { Calendar } from '@/components/ui/calendar'
import {
  CalendarDate,
  DateFormatter,
  type DateValue,
  getLocalTimeZone,
  parseDate,
  toDate,
  today
} from '@internationalized/date'

const props = defineProps<{
  name: string
  label: string
  setValues: (values: Record<string, any>) => void
  values: Record<string, any>
}>()

const df = new DateFormatter('no-NB', {
  dateStyle: 'long'
})

const placeholder = ref()

const value = computed({
  get: () => (props.values[props.name] ? parseDate(props.values[props.name]) : undefined),
  set: (val) => {
    props.setValues({
      [props.name]: val?.toString() ?? ''
    })
  }
})
</script>
<template>
  <FormField :name="name">
    <FormInputLayout :name="label">
      <FormItem>
        <Popover>
          <PopoverTrigger as-child>
            <FormControl>
              <Button
                variant="outline"
                :class="cn('w-full text-start font-normal', !value && 'text-muted-foreground')"
                :shadow="false"
              >
                <div class="w-full flex justify-between items-center">
                  <span>{{
                    value ? df.format(toDate(value, getLocalTimeZone())) : 'Velg en dato'
                  }}</span>
                  <CalendarIcon class="h-4 w-4" />
                </div>
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent class="w-fit">
            <!-- @vue-ignore -->
            <Calendar
              locale="nb"
              v-model:placeholder="placeholder"
              v-model="value"
              :calendar-label="label"
              initial-focus
              :min-value="today(getLocalTimeZone()) as DateValue"
              @update:model-value="
                (e) => {
                  if (e) {
                    setValues({
                      [props.name]: e.toString()
                    })
                  } else {
                    setValues({
                      [props.name]: ''
                    })
                  }
                }
              "
            />
          </PopoverContent>
        </Popover>
      </FormItem>
    </FormInputLayout>
  </FormField>
</template>
