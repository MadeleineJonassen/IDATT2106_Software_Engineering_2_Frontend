import { useQuery } from '@tanstack/vue-query'
import { UserControllerService } from '@/lib/api'

export const useLeaderboard = () => {
  return useQuery({
    queryFn: () => UserControllerService.getGlobalLeaderboard(),
    queryKey: ['leaderboard'],
    staleTime: 1000 * 60 * 5
  })
}
