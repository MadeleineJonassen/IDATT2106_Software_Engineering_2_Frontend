<script setup lang="ts">
import { RouterView, useRoute, useRouter } from 'vue-router'
import Header, { type HeaderButtonType } from '@/components/navigation/Header.vue'
import { useAuth0 } from '@auth0/auth0-vue'
import { OpenAPI } from '@/lib/api'
import { Toaster } from '@/components/ui/toast'
import BottomBar from '@/components/navigation/BottomBar.vue'
import { useWindowScroll } from '@vueuse/core'
import { computed, ref, watch } from 'vue'
import { BookmarkCheck, LandPlot, Trophy } from 'lucide-vue-next'
import { isNewUser } from '@/lib/utils'
import LoadingOverlay from '@/components/ui/LoadingOverlay.vue'
import { useUserDetails } from '@/lib/composables/user'
import type { ProfilePopoverData } from '@/components/ui/ProfileImagePopover.vue'

const route = useRoute()
const router = useRouter()

const auth0 = useAuth0()
OpenAPI.TOKEN = () => auth0.getAccessTokenSilently()

// Handle the redirection to onboarding for new users
watch(
  [auth0.user, auth0.isLoading, auth0.error, route],
  () => {
    if (auth0.isLoading.value || auth0.error.value) return
    if (isNewUser(auth0.user.value?.nickname ?? '')) {
      router.push({ name: 'onboarding' })
      return
    }
    if (!isNewUser(auth0.user.value?.nickname ?? '') && route.name === 'onboarding') {
      router.replace({ name: 'dashboard' })
    }
  },
  { immediate: true }
)

const showLoadingOverlay = ref(true)

const headerButtons: HeaderButtonType[] = [
  {
    label: 'Dashbord',
    url: '/'
  },
  {
    label: 'Mine Sparemål',
    url: '/sparemaal'
  },
  {
    label: 'Mine Spareutfordringer',
    url: '/utfordringer'
  },
  {
    label: 'Nyheter',
    url: '/nyheter'
  },
  {
    label: 'Troféer',
    url: '/trofeer'
  }
]

const bottomBarButtons = [
  {
    label: 'Utfordringer',
    icon: BookmarkCheck,
    name: 'saving_challenges'
  },
  {
    label: 'Mål',
    icon: LandPlot,
    name: 'savingGoals'
  },
  {
    label: 'Troféer',
    icon: Trophy,
    name: 'trophies'
  }
]

watch(
  [auth0.isLoading, auth0.error],
  () => {
    if (auth0.error.value) alert('Kunne ikke hente brukerinfo!')
    showLoadingOverlay.value = auth0.isLoading.value
  },
  {
    immediate: true
  }
)

// Get the scroll position of the body
const showHeader = ref(true)
const scroll = useWindowScroll()

watch(scroll.y, (newPos, prevPos) => {
  showHeader.value = newPos <= prevPos
})

const ignoreHeaderRouteNames = ['landing']

const username = computed(() => auth0.user?.value?.nickname)
const userDetails = useUserDetails(username)
</script>

<template>
  <!-- Insert header component here -->
  <Header
    :header-buttons="headerButtons"
    class="fixed transition-all duration-500"
    :class="showHeader ? 'top-0' : '-top-full md:top-0'"
    v-if="!ignoreHeaderRouteNames.includes(route?.name?.toString() ?? '')"
    :popover-data="{ ...userDetails.data?.value } as ProfilePopoverData"
  />
  <BottomBar
    v-if="!ignoreHeaderRouteNames.includes(route?.name?.toString() ?? '')"
    :nav-buttons="bottomBarButtons"
    class="fixed bottom-2 left-1/2 -translate-x-1/2 grid md:hidden z-50"
  />
  <LoadingOverlay :visible="showLoadingOverlay" />
  <Toaster />
  <RouterView />
</template>
