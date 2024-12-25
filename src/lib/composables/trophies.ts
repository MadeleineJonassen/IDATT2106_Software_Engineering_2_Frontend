import { useQuery } from '@tanstack/vue-query'
import { BadgeControllerService, UserControllerService } from '@/lib/api'
import { computed } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'

// Waiting for backend
export const useUserTrophies = () => {
  const auth0 = useAuth0()
  const username = computed(() => auth0.user.value?.nickname ?? '')
  const enabled = computed(() => !!username.value)
  return useQuery({
    queryFn: () => BadgeControllerService.getAllBadgeProgress(username?.value ?? ''),
    queryKey: ['badges', username],
    staleTime: 1000 * 60,
    enabled
  })
}

export const useFinishedTrophies = () => {
  const auth0 = useAuth0()
  const username = computed(() => auth0.user.value?.nickname ?? '')
  const enabled = computed(() => !!username.value)
  return useQuery({
    queryFn: () => BadgeControllerService.getBadgesByUser(username?.value ?? ''),
    queryKey: ['finished-badges', username],
    staleTime: 1000 * 60,
    enabled
  })
}

// Waiting for backend

export const useAllTrophies = () => {
  return useQuery({
    queryFn: () => BadgeControllerService.getAllBadges(),
    queryKey: ['all-trophies'],
    staleTime: 1000 * 60
  })
}
