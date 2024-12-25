import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import {
  SavingChallengeControllerService,
  type SavingChallengeRequestDto,
  SavingGoalControllerService
} from '@/lib/api'
import type { ComputedRef, Ref } from 'vue'
import { computed, watch } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'

/**
 * Gets all the saving challenges for a specific goal
 * @param goalId
 */
export const useSavingChallenges = ({ goalId }: { goalId?: ComputedRef<string> }) => {
  const auth0 = useAuth0()
  const username = computed(() => auth0.user.value?.nickname ?? '')
  const enabled = computed(() => !!username.value)
  return useQuery({
    queryFn: () =>
      SavingChallengeControllerService.getAllChallengesInGoal(goalId?.value ?? '', username.value),
    queryKey: ['saving-challenges', goalId?.value],
    staleTime: 1000 * 60,
    enabled
  })
}
/**
 * Gets all the saving challenges for the current user
 */
export const useAllSavingChallenges = () => {
  const auth0 = useAuth0()
  const username = computed(() => auth0.user.value?.nickname ?? '')
  const enabled = computed(() => !!username.value)
  return useQuery({
    queryFn: () => SavingChallengeControllerService.getAllChallengesInUser(username.value),
    queryKey: ['all-saving-challenges', username.value],
    staleTime: 1000 * 60,
    enabled
  })
}

/**
 * Creates a new saving challenge
 */
export const useMutateSavingChallenge = () => {
  const auth0 = useAuth0()
  const username = computed(() => auth0.user.value?.nickname ?? '')
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ goalId, challenge }: { goalId: string; challenge: SavingChallengeRequestDto }) =>
      SavingChallengeControllerService.createSavingChallenge(goalId, username.value, challenge),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [
          'all-savings-challenges',
          'saving-challenges',
          'saving-suggestions',
          'all-saving-challenges'
        ]
      })

      queryClient.invalidateQueries({ queryKey: ['saving-challenges'] })
    }
  })
}

/**
 * Fetches the top challenge suggestions for the given saving goal
 */
export const getChallengeSuggestions = (goalId: Ref<string | undefined>) => {
  const auth0 = useAuth0()
  const username = computed(() => auth0.user.value?.nickname ?? '')
  const enabled = computed(() => !!username.value && !!goalId.value)
  return useQuery({
    queryFn: () =>
      SavingChallengeControllerService.getSavingChallengeSuggestion(
        username.value,
        parseInt(goalId.value ?? '')
      ),
    queryKey: ['saving-suggestions', goalId],
    staleTime: 1000 * 60 * 5,
    enabled
  })
}

export const useGoalChallenges = (goalId: Ref<string | undefined>) => {
  const auth0 = useAuth0()
  const username = computed(() => auth0.user.value?.nickname ?? '')
  const enabled = computed(() => !!username.value && !!goalId.value)
  return useQuery({
    queryFn: () =>
      SavingChallengeControllerService.getAllChallengesInGoal(goalId.value ?? '', username.value),
    enabled,
    queryKey: ['saving-challenges', goalId]
  })
}

export const useTransferToGoal = () => {
  const queryClient = useQueryClient()
  const auth0 = useAuth0()
  const username = computed(() => auth0.user.value?.nickname ?? '')
  return useMutation({
    mutationFn: ({ challengeId }: { challengeId: number }) =>
      SavingChallengeControllerService.completeChallenge(username.value, challengeId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['saving-challenges', 'saving-goals']
      })
    }
  })
}
