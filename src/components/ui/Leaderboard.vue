<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Trophy, User } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import type { UserLeaderboardDto } from '@/lib/api'

const router = useRouter()

interface Props {
  users: UserLeaderboardDto[]
}

const props: Props = defineProps<{
  users: UserLeaderboardDto[]
}>()

const handleGoToProfile = (username: string | undefined) => {
  if (username) {
    router.push({ name: 'user', params: { username: username } })
  }
}
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle class="flex flex-row gap-2.5"> <Trophy /> Ledertavle </CardTitle>
    </CardHeader>
    <CardContent>
      <ScrollArea class="h-36 pr-5">
        <div class="flex flex-col gap-2.5">
          <div
            v-for="(user, index) in users"
            :key="index"
            class="flex flex-row gap-2.5 items-center cursor-pointer border-0 rounded-2xl py-0.5 px-2 hover:bg-muted"
            @click.prevent="handleGoToProfile(user.username)"
            data-test="leaderboardEntry"
          >
            <div data-test="position class='text-xl'">
              {{ index + 1 }}
            </div>
            <Avatar class="w-8 h-8">
              <AvatarImage :src="user.imageUrl ?? 'undefined'" />
              <AvatarFallback><User /></AvatarFallback>
            </Avatar>
            <div class="w-full text-xl" data-test="username">{{ user.username }}</div>

            <div class="flex flex-row gap-4 items-center">
              <div class="text-sm text-end text-nowrap" data-test="streak">
                🔥 {{ user.currentStreak ?? 0 }}
              </div>
              <div class="text-end class text" data-test="score">
                {{ user.score }}
              </div>
            </div>
          </div>
        </div>

        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </CardContent>
  </Card>
</template>

<style scoped></style>
