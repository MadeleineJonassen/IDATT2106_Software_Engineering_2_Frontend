<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

import { Input } from '@/components/ui/input'

import { Plus } from 'lucide-vue-next'
import PageWrapper from '@/components/ui/PageWrapper.vue'
import SavingGoalCard from '@/components/ui/SavingGoalCard.vue'
import { useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import { useSavingGoals } from '@/lib/composables/savingGoal'
import { Skeleton } from '@/components/ui/skeleton'

// Querying without caching
const { data: goals, isLoading, error } = useSavingGoals()
const router = useRouter()

const search = ref('')
const handleGoalRedirect = (id: number) => {
  // Fix this
  router.push({
    name: 'savingGoal',
    params: {
      goalId: id
    }
  })
}

const filteredGoals = computed(() => {
  if (!goals) return []
  return goals.value?.filter((goal) =>
    goal.title?.toLowerCase().includes(search.value.toLowerCase())
  )
})

const createGoal = () => {
  router.push({ name: 'create_goal' })
}
</script>

<template>
  <PageWrapper title="Mine sparemål">
    <div class="flex flex-col xl:flex-row w-full gap-5 h-fit">
      <Card class="w-full animate-slide-in">
        <CardContent class="w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-5">
          <SavingGoalCard
            :title="goal.title"
            :end-date="new Date(goal.endingDate as string)"
            :progress="goal.amountSaved as number"
            :target="goal.goalSum ?? 0"
            description=""
            :key="n"
            img="https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*"
            @click="() => handleGoalRedirect(goal.id ?? 0)"
            v-for="(goal, n) in filteredGoals"
          />
          <template v-if="isLoading">
            <Skeleton
              v-for="(n, i) in Array(2).fill(null)"
              :key="i"
              class="w-full h-80 rounded-3xl"
            />
          </template>
          <div
            class="absolute h-full w-full -z-10 top-0 left-0 flex items-center place-content-center"
          >
            <span class="r" v-if="!goals?.length && !isLoading && !error">
              Du har ingen sparemål enda
            </span>
            <span
              class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
              v-if="error"
            >
              En feil oppstod
            </span>
          </div>
        </CardContent>
      </Card>

      <div class="w-auto">
        <Card
          class="sticky w-full space-y-5 top-20 animate-slide-in delay-100 fill-mode-both backdrop-blur"
        >
          <Input
            placeholder="Søk..."
            class="w-full"
            @input="(val: InputEvent) => (search = (val.currentTarget as HTMLInputElement).value)"
          />
          <Button class="gap-1 w-full" @click="createGoal">
            <Plus class="w-4 h-4" />
            Opprett sparemål
          </Button>
        </Card>
      </div>
    </div>
  </PageWrapper>
</template>
