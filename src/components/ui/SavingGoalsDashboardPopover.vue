<script setup lang="ts">
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ref } from 'vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ChevronDown, LandPlotIcon } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import type { SavingGoalDtoDetailsResponse } from '@/lib/api'

interface Props {
  savingGoals: SavingGoalDtoDetailsResponse[]
  activeGoalId: string
}

const props = withDefaults(defineProps<Props>(), {
  savingGoals: () => []
})

const open = ref(false)

const emit = defineEmits<{
  (e: 'changeSavingGoal', id: string): void
}>()

const handleChangeGoal = (newGoalId: string) => {
  if (props.activeGoalId === newGoalId) return
  emit('changeSavingGoal', newGoalId)
  open.value = false
}
</script>

<template>
  <Popover :open="open" @update:open="(state) => (open = state)">
    <PopoverTrigger as-child class="cursor-pointer"
      ><Button variant="ghost"><ChevronDown /></Button>
    </PopoverTrigger>
    <PopoverContent class="flex flex-col gap-2.5 bg-card-solid">
      <h3 class="scroll-m-20 text-lg font-semibold tracking-tight">Dine sparemål</h3>

      <div
        data-test="popoverClickable"
        v-for="(savingGoal, index) in savingGoals"
        :key="index"
        class="flex flex-row gap-2.5 items-center py-1 px-2 rounded-lg cursor-pointer hover:bg-muted"
        :class="savingGoal.id?.toString() === activeGoalId ? 'bg-muted' : ''"
        @click.prevent="handleChangeGoal(savingGoal.id?.toString() ?? '')"
      >
        <Avatar>
          <AvatarImage :src="savingGoal.imageUrl ?? 'undefined'"></AvatarImage>
          <AvatarFallback><LandPlotIcon /></AvatarFallback>
        </Avatar>
        <div>{{ savingGoal.title }}</div>
      </div>
    </PopoverContent>
  </Popover>
</template>
