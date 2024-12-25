import {
  useMutation,
  type UseMutationReturnType,
  useQuery,
  useQueryClient
} from '@tanstack/vue-query'
import type { UserDetailsRequestDto, UserDto } from '@/lib/api'
import { UserControllerService } from '@/lib/api'
import type { Ref } from 'vue'
import { computed } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'

export const useRegisterUser = (): UseMutationReturnType<UserDto, any, any, any> => {
  return useMutation({
    mutationFn: (user: UserDto) => UserControllerService.saveUser(user)
  })
}

export const useUserDetails = (userId: Ref<string | undefined>) => {
  const enabled = computed(() => !!userId.value)
  return useQuery({
    queryFn: () => UserControllerService.getUserDetails(userId.value?.toString() ?? ''),
    queryKey: ['user-details', userId],
    staleTime: 1000 * 60,
    enabled
  })
}

export const useUpdateuser = () => {
  const queryClient = useQueryClient()
  const auth0 = useAuth0()
  const username = computed(() => auth0.user.value?.nickname ?? '')
  return useMutation({
    mutationFn: (userData: UserDetailsRequestDto) =>
      UserControllerService.updateUser(username.value, userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-details'] })
    }
  })
}
