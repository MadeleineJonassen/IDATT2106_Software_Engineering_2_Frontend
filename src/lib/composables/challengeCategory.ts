import { useQuery } from '@tanstack/vue-query'
import { TransactionCategoryControllerService } from '@/lib/api'

export const useChallengeCategories = () => {
  return useQuery({
    queryFn: () => TransactionCategoryControllerService.getAllCategories(),
    queryKey: ['challenge-categories'],
    staleTime: 1000 * 60
  })
}
