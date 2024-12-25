<script setup lang="ts">
import { useRoute } from 'vue-router'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { UserIcon } from 'lucide-vue-next'
import StatCard from '@/components/ui/statcard/StatCard.vue'
import { Button } from '@/components/ui/button'
import { useAuth0 } from '@auth0/auth0-vue'
import { computed, watch } from 'vue'
import PageWrapper from '@/components/ui/PageWrapper.vue'
import { useUserDetails } from '@/lib/composables/user'
import { useToast } from '@/components/ui/toast'
import BadgesDisplayCard from '@/BadgesDisplayCard.vue'

const route = useRoute()
const auth0 = useAuth0()
const { toast } = useToast()

const usernameAuth0 = computed(() => auth0.user.value?.nickname)
const usernameFromPath = computed(() => route.params.username as string)

const userDetails = useUserDetails(usernameFromPath)
const isCurrentUserPage = computed(() => usernameAuth0.value === usernameFromPath.value)

watch(
  [usernameFromPath, userDetails.data, isCurrentUserPage],
  () => {
    if (!userDetails.data.value) return

    if (userDetails.error.value) {
      // vis toast
      toast({
        title: 'En feil oppstod!',
        description: 'Kunne ikke hente brukerinfo!',
        variant: 'destructive'
      })
    }
  },
  { immediate: true }
)

const handleSignOut = () => {
  auth0.logout({
    logoutParams: { returnTo: window.location.origin }
  })
}
</script>
<template>
  <PageWrapper>
    <Card class="mx-auto min-w-72 p-6 md:px-14 py-11 md:w-fit w-full">
      <CardContent class="p-0 items-center flex flex-col gap-4 md:-mt-20 w-full">
        <Avatar class="w-40 h-40 shadow-md">
          <AvatarImage :src="userDetails.data.value?.imageUrl ?? ''" />
          <AvatarFallback><UserIcon /></AvatarFallback>
        </Avatar>

        <h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">@{{ usernameFromPath }}</h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-2.5 w-full">
          <StatCard
            class="font-semibold"
            :title="`🔥 ${userDetails.data.value?.currentStreak ?? 0}`"
            description="Sparestreak"
          />
          <StatCard
            class="font-semibold"
            :title="`🏅 ${userDetails.data.value?.completedChallenges ?? 0}`"
            description="Ferdige utfordringer"
          />
          <StatCard
            class="font-semibold"
            :title="`💵 ${userDetails.data.value?.totalSaved ?? 0}`"
            description="Penger spart"
          />
          <StatCard
            class="font-semibold"
            :title="`🏆 ${userDetails.data.value?.completedBadges?.length ?? 0}`"
            description="Badges opparbeidet"
          />
          <BadgesDisplayCard
            :badges="userDetails.data.value?.completedBadges ?? []"
            class="items-center mt-0 md:mt-5 font-semibold"
          />
          <StatCard
            class="items-center mt-0 md:mt-5 font-semibold"
            :title="` ${userDetails.data.value?.score ?? 0}p`"
          />
        </div>

        <div class="flex flex-col w-full mt-2.5" v-if="!auth0.isLoading.value">
          <Button v-if="isCurrentUserPage" class="w-full" variant="outline" @click="handleSignOut">
            Logg ut</Button
          >
        </div>
      </CardContent>
    </Card>
  </PageWrapper>
</template>
