<script setup lang="ts">
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'

defineProps<{
  category: string
  newExpenditure: string
  difference: string
  oldExpenditure: string
  startDate: string
  endDate: string
}>()

const emit = defineEmits(['add-challenge'])

const addChallenge = () => {
  emit('add-challenge')
}
</script>

<template>
  <Card>
    <CardHeader>
      <div class="flex justify-between font-bold">
        <p>Bruke {{ newExpenditure }},- på {{ category }}</p>
        <a>{{ format(startDate, 'dd.MM.yy') }} - {{ format(endDate, 'dd.MM.yy') }}</a>
      </div>
    </CardHeader>
    <CardContent>
      Du bruker gjennomsnittlig {{ oldExpenditure }},- på {{ category }} i uken. Bruk heller
      {{ newExpenditure }},- for å spare {{ difference }},- denne uken.
    </CardContent>
    <CardFooter class="flex gap-2.5 place-content-end">
      <Button class="w-full" variant="secondary" @click="addChallenge">Godta</Button>
    </CardFooter>
  </Card>
</template>
