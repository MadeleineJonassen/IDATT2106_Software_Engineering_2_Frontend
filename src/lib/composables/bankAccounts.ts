import { useQuery } from '@tanstack/vue-query'
import {BankAccountControllerService, UserControllerService} from '@/lib/api'
import {computed, type Ref} from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'

export const useBankAccounts = () => {
  const auth0 = useAuth0()
  const username = computed(() => auth0.user.value?.nickname ?? '')
  const enabled = computed(() => !!username.value)
  return useQuery({
    queryFn: () => UserControllerService.getAllBankAccountsByUser(username?.value ?? ''),
    queryKey: ['bank-accounts', username?.value ?? ''],
    staleTime: 1000 * 60,
    enabled
  })
}
export const useExpectedExpense = (categoryId: Ref<number | undefined>, accountId: Ref<number | undefined>) => {
  const auth0 = useAuth0()
  const username = computed(() => auth0.user.value?.nickname ?? '')
  const enabled = computed(() => !!username.value)
  return useQuery({
    queryFn: () => BankAccountControllerService.getExpectedExpense(username?.value ?? '', accountId.value ?? 0, categoryId.value ?? 0),
    queryKey: ['expected-expense', categoryId, accountId],
    staleTime: 1000 * 60 * 5,
    enabled
  })
}
