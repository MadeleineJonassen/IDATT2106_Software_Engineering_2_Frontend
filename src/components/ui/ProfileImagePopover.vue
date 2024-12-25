<script setup lang="ts">
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User } from 'lucide-vue-next'
import StatCard from '@/components/ui/statcard/StatCard.vue'
import { Button } from '@/components/ui/button'
import { useRouter } from 'vue-router'
import { useAuth0 } from '@auth0/auth0-vue'
import { ref } from 'vue'

defineProps<{
  avatarUrl?: string
  popoverData?: ProfilePopoverData
}>()

export type ProfilePopoverData = {
  currentStreak?: number
  completedChallenges?: number
  totalSaved?: number
}

const auth0 = useAuth0()
const router = useRouter()

const open = ref(false)

const handleGoToProfile = () => {
  const username = auth0.user.value?.nickname

  if (username) {
    open.value = false
    router.push({ name: 'user', params: { username: username } })
  }
}

const handleSignOut = () => {
  if (auth0.isAuthenticated) {
    open.value = false
    auth0.logout()
  }
}
</script>

<template>
  <Popover :open="open" @update:open="(state) => (open = state)">
    <PopoverTrigger as-child>
      <Avatar>
        <AvatarImage
          data-testid="avatar-image"
          :src="avatarUrl ?? 'undefined'"
          class="cursor-pointer"
        />
        <AvatarFallback><User /></AvatarFallback>
      </Avatar>
    </PopoverTrigger>
    <PopoverContent class="mr-6">
      <div class="p-1 flex flex-col gap-5">
        <h3 data-test="asdf" class="scroll-m-20 text-md font-semibold tracking-tight">
          Statistikk
        </h3>
        <div class="flex flex-col gap-2.5">
          <StatCard
            variant="small"
            :title="`🔥 ${popoverData?.currentStreak ?? 0}`"
            description="Sparestreak"
          />
          <StatCard
            variant="small"
            :title="`🏅 ${popoverData?.completedChallenges ?? 0}`"
            description="Ferdige spareutfordringer"
          />
          <StatCard
            variant="small"
            :title="`💵 ${popoverData?.totalSaved ?? 0}`"
            description="Penger spart"
          />
          <Button @click.prevent="handleGoToProfile" class="w-full font-normal" variant="secondary"
            >Min profil</Button
          >
          <Button
            @click.prevent="handleSignOut"
            class="w-full flex-1 font-normal"
            variant="destructive"
            >Logg ut</Button
          >
        </div>
      </div>
    </PopoverContent>
  </Popover>
</template>
