<script setup lang="ts">
import { cn } from '@/lib/utils'
import { type HTMLAttributes } from 'vue'
import ModeToggle from '@/components/ui/ModeToggle.vue'
import HeaderButton from '@/components/ui/HeaderButton.vue'
import { useRouter } from 'vue-router'
import { useAuth0 } from '@auth0/auth0-vue'
import { Button } from '@/components/ui/button'
import ProfileImagePopover, {
  type ProfilePopoverData
} from '@/components/ui/ProfileImagePopover.vue'
import DefaultHead from '../icons/welcome-images/Default-head.vue'

export type HeaderButtonType = {
  label: string
  url: string
}

interface Props {
  class?: HTMLAttributes['class']
  headerButtons?: HeaderButtonType[]
  popoverData?: ProfilePopoverData
}
const props = defineProps<Props>()

const router = useRouter()

const redirectToPath = (path: string) => {
  router.push(path)
}

const oauth = useAuth0()
</script>
<template>
  <header>
    <div
      class=""
      :class="
        cn(
          'bg-card text-card-foreground h-16 gap-8 w-full flex items-center px-5 border-solid z-50 relative backdrop-blur',
          props.class
        )
      "
    >
      <Button variant="ghost" class="py-1 flex flex-row" @click="() => redirectToPath('/')">
        <Default-head class="w-16"></Default-head>
        <h1
          class="scroll-m-20 text-3xl font-bold tracking-tighter leading-none lg:text-4xl text-foreground align-middle"
        >
          Sparesti
        </h1>
      </Button>
      <div class="w-fit gap-0 h-full hidden md:flex">
        <HeaderButton
          v-for="(button, n) in headerButtons"
          :key="n"
          :active="router.currentRoute.value.path === button.url"
          @click="() => redirectToPath(button.url)"
          >{{ button.label }}</HeaderButton
        >
      </div>
      <div class="w-full flex gap-4 place-content-end">
        <ModeToggle />
        <ProfileImagePopover :avatar-url="oauth.user.value?.picture" :popover-data="popoverData" />
      </div>
    </div>
  </header>
</template>
