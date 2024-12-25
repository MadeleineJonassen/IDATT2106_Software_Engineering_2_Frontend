import { useQuery } from '@tanstack/vue-query'
import { NewsControllerService } from '@/lib/api'

export const useNews = () => {
  return useQuery({
    queryKey: ['news'],
    queryFn: () => NewsControllerService.getNews(),
    enabled: true,
    staleTime: 1000 * 60 * 5 // Only refetch after 5 minutes
  })
}
