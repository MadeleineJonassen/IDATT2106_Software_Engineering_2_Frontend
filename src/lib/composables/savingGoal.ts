import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { SavingGoalControllerService, type SavingGoalDtoPost } from '@/lib/api'
import { computed, type Ref, watch } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'

export const useSavingGoals = () => {
  const auth0 = useAuth0()
  const username = computed(() => auth0.user.value?.nickname ?? '')
  const enabled = computed(() => !!username.value)
  return useQuery({
    queryFn: () => SavingGoalControllerService.getAllSavingGoals(username?.value ?? ''),
    queryKey: ['saving-goals', username?.value ?? ''],
    staleTime: 1000 * 60,
    enabled
  })
}

export const useSavingGoal = (goalId: Ref<string | undefined>) => {
  const auth0 = useAuth0()
  const username = computed(() => auth0.user.value?.nickname ?? '')
  const enabled = computed(() => !!username.value && !!goalId.value)
  const data = useQuery({
    queryFn: () =>
      SavingGoalControllerService.getSavingGoal(goalId.value?.toString() ?? '', username.value),
    queryKey: ['saving-goals', username?.value ?? '', goalId],
    staleTime: 1000 * 60,
    enabled
  })

  return data
}

export const useMutateSavingGoal = () => {
  const queryClient = useQueryClient()
  const auth0 = useAuth0()
  const username = computed(() => auth0.user.value?.nickname ?? '')
  return useMutation({
    mutationFn: ({ savingGoal }: { savingGoal: SavingGoalDtoPost }) =>
      SavingGoalControllerService.createSavingGoal(username.value, savingGoal),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['saving-goals'] })
    }
  })
}

export const useUpdateSavingGoal = (goalId: Ref<string | undefined>) => {
  const queryClient = useQueryClient()
  const auth0 = useAuth0()
  const username = computed(() => auth0.user.value?.nickname ?? '')
  return useMutation({
    mutationFn: ({ savingGoal }: { savingGoal: SavingGoalDtoPost }) =>
      SavingGoalControllerService.editSavingGoal(username.value, goalId.value ?? '', savingGoal),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['saving-goals'] })
    }
  })
}
