<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth0 } from '@auth0/auth0-vue'
import PageWrapper from '@/components/ui/PageWrapper.vue'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-vue-next'
import TutorialStep from '@/components/ui/TutorialStep.vue'
import { useBankAccounts } from '@/lib/composables/bankAccounts'
import { useToast } from '@/components/ui/toast'
import { isNewUser, setIsNotNewUser } from '@/lib/utils'
import type { UserDetailsRequestDto, UserDto } from '@/lib/api'
import { useRegisterUser, useUpdateuser } from '@/lib/composables/user'
import SetPreferredAccounts, { type formTypes } from '@/components/ui/SetPreferredAccounts.vue'

const auth0 = useAuth0()
const router = useRouter()
const { toast } = useToast()
const accounts = useBankAccounts()
const user = useAuth0().user
const registeringUser = ref(false)
const page = ref(0)
const mutateUser = useRegisterUser()
const updateUser = useUpdateuser()

const toDashboard = () => {
  registeringUser.value = true
  router
    .push({
      name: 'dashboard'
    })
    .then(() => {
      setIsNotNewUser(user.value?.nickname ?? '')
      toast({
        title: 'Success!',
        description: 'Welcome to the dashboard!',
        variant: 'default'
      })
    })
    .catch((err) => {
      toast({
        title: 'Å nei!',
        description: 'Vi kunne ikke registrere deg! Vennligst prøv igjen senere.',
        variant: 'destructive'
      })
      console.error(err)
    })
}

onMounted(() => {
  if (!isNewUser(user.value?.nickname as string)) {
    router.push({ name: 'dashboard' })
  }
})

const registerUser = () => {
  const newUser: UserDto = {}
  newUser.username = auth0.user.value?.nickname
  newUser.email = auth0.user.value?.email
  newUser.fullName = auth0.user.value?.name
  newUser.imageUrl = auth0.user.value?.imageUrl

  return mutateUser.mutateAsync(newUser)
}

const toggleView = () => {
  page.value++
  registerUser()
}

const updateAccounts = (values: formTypes) => {
  updateUser
    .mutateAsync({
      preferredCheckingAccountId: values.sourceBankAccountId,
      preferredSavingsAccountId: values.destinationBankAccountId
    } as UserDetailsRequestDto)
    .then(() => {
      toast({
        title: 'Vellykket!',
        description: 'Preferansene dine er lagret. Lykke til med sparingen!'
      })
      setIsNotNewUser(auth0.user.value?.nickname ?? '')
      router.push({name: "dashboard"})
    }).catch((error) => {
      toast( {
        title: 'En feil skjedde',
        variant:'destructive'
      })
  })
}
</script>

<template>
  <PageWrapper :title="`Velkommen ${user?.given_name || user?.nickname || 'til oss'}!`">
    <div class="flex flex-col gap-6 place-content-end">
      <div v-if="page == 0" class="mt-40">
        <div class="flex flex-col md:flex-row gap-6 flex-wrap place-content-center">
          <TutorialStep
            number="1"
            heading="Opprett et sparemål"
            description="Og lag flere spareutfordringer som må til for å nå et sparemål"
          />
          <TutorialStep
            number="2"
            heading="Spar penger"
            description="Spor progresjonen din mens du sparer"
          />
          <TutorialStep
            number="3"
            heading="Få badges"
            description="Dersom du er flink til å oppnå spareutfordringene, får du badges som du kan vise til vennene dine"
          />
          <TutorialStep
            number="4"
            heading="Oppfyll drømmene dine!"
            description="Unn deg noe fint når du har nådd sparemålet ditt!"
          />
        </div>
        <div class="flex justify-end mt-10">
          <Button @click="toggleView" variant="default" class="gap-2.5 w-full md:w-fit" size="lg">
            <span v-if="registeringUser">Laster</span>
            <span v-else>Start</span>
            <ArrowRight class="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div v-else class="mt-10"></div>
    </div>
    <div v-if="page == 1">
      <SetPreferredAccounts :accounts="accounts.data.value" @submit="updateAccounts" />
    </div>
  </PageWrapper>
</template>
