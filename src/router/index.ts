import { createRouter, createWebHistory, useRoute } from 'vue-router'
import UserView from '@/views/UserView.vue'
import DashboardView from '@/views/DashboardView.vue'
import EditGoalView from '@/views/SavingGoalView.vue'
import SavingGoalView from '@/views/SavingGoalView.vue'
import SavingView from '@/views/SavingView.vue'
import WelcomeView from '@/views/WelcomeView.vue'
import OnboardingView from '@/views/OnboardingView.vue'
import { useAuth0 } from '@auth0/auth0-vue'
import { watch } from 'vue'
import NewsView from '@/views/NewsView.vue'
import TrophyView from '@/views/TrophyView.vue'
import SaveTransactionsView from '@/views/SaveTransactionsView.vue'
import SingleSavingsGoalView from '@/views/SingleSavingsGoalView.vue'
import CreateChallengeView from '@/views/CreateChallengeView.vue'
import SaveChallengesView from '@/views/SaveChallengesView.vue'
import CreateGoalView from '@/views/CreateGoalView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/ny-bruker',
      name: 'onboarding',
      component: OnboardingView
    },
    {
      path: '/user/:username',
      name: 'user',
      component: UserView
    },
    {
      path: '/sparemaal/ny',
      name: 'create_goal',
      component: CreateGoalView
    },
    {
      path: '/utfordringer/ny',
      name: 'create_challenge',
      component: CreateChallengeView
    },
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/sparemaal/rediger/:goalId',
      name: 'edit saving goals',
      component: EditGoalView
    },
    {
      path: '/sparemaal',
      name: 'savingGoals',
      component: SavingView
    },
    {
      path: '/landing',
      name: 'landing',
      component: WelcomeView
    },
    {
      path: '/utfordringer',
      name: 'saving_challenges',
      component: SaveChallengesView
    },
    {
      path: '/sparemaal/:goalId',
      name: 'savingGoal',
      component: SingleSavingsGoalView
    },
    {
      path: '/nyheter',
      name: 'news',
      component: NewsView
    },
    {
      path: '/trofeer',
      name: 'trophies',
      component: TrophyView
    },
    {
      path: '/dev',
      name: 'save transactions',
      component: SaveTransactionsView
    }
    /*
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }*/
  ]
})

const route = useRoute()

router.beforeEach((to) => {
  if (to.name == 'landing') return
  const auth0 = useAuth0()

  watch(
    [auth0.isLoading, auth0.error],
    () => {
      if (auth0.isLoading.value) return

      if (auth0.error.value) {
        console.error('Error loading user', auth0.error.value)
        router.push({ name: 'landing' })
        return
      }

      if (!auth0.isAuthenticated.value) {
        router.push({ name: 'landing' })
      }
    },
    { immediate: true }
  )
})

export default router
