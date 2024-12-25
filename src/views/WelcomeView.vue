<template>
  <PageWrapper class="flex gap-40 flex-col">
    <Card class="h-fit overflow-hidden border-none">
      <CardHeader>
        <div class="flex flex-col items-center gap-20 lg:gap-10">
          <Label class="scroll-m-20 text-4xl font-bold tracking-tight lg:text-6xl text-center"
            >Velkommen til SpareSti</Label
          >
          <Label class="text-xl lg:text-2xl text-center"> Gjør sparing til en lek! </Label>
        </div>
      </CardHeader>
      <Logo class="h-80 w-80 absolute left-0 -bottom-14 -z-10" />
      <CardContent class="relative">
        <div
          class="flex flex-col gap-0 items-center md:gap-20 md:flex-row flex-wrap place-content-center"
        >
          <Button variant="default" size="lg" @click="goToAuth0" class="text-lg md:w-fit">
            Registrer deg nå!
          </Button>
        </div>
      </CardContent>
    </Card>

    <div class="flex flex-row gap-20 md:flex-row flex-wrap place-content-center text-center">
      <!-- First Column -->
      <div class="flex flex-col gap-20 place-content-center">
        <TutorialStep
          heading="Gjør sparing morsomt"
          description="Sparesti gjør sparing til en lek! Her setter vi opp morsome utfordringer du kan gjennomføre for å få badges, og ikke minst, mer penger!"
          class=""
        />
        <SuperPig />
        <TutorialStep
          heading="Sett mål"
          description="Sparesti lar deg sette egene spareutfordringer som gjør det oversiktelig å nå sine sparemål. Om du trenger hjelp til å komme igang, genererer vi gjerne noen utfordinger for deg!"
          class=""
        />
      </div>

      <!-- Second Column -->
      <div class="flex flex-col gap-20 place-content-center">
        <NinjaPig class="h-72 w-72" />
        <TutorialStep
          heading="Spar med venner"
          description="Alt er som regel morsommere med venner, inkludert sparing. Med sparesti kan du konkurrere med vennene dine om hvem som sparer mest!"
          class=""
        />
        <SusPigUs class="h-80 w-80" />
      </div>
    </div>

    <Card class="flex flex-col mt-40 mb-20 md:items-center">
      <Label class="scroll-m-20 text-4xl font-bold tracking-tight lg:text-6xl my-10 text-center"
        >Start din sparereise med SpareSti!</Label
      >
      <Button variant="default" size="lg" @click="goToAuth0" class="text-lg w-full md:w-fit">
        Registrer deg nå!
      </Button>
    </Card>
  </PageWrapper>
</template>

<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue'
import { Button } from '@/components/ui/button/index'
import PageWrapper from '@/components/ui/PageWrapper.vue'
import TutorialStep from '@/components/ui/TutorialStep.vue'
import { onMounted, watch } from 'vue'
import router from '@/router'
import { Label } from '@/components/ui/label'
import Logo from '@/components/icons/welcome-images/Logo.vue'
import SuperPig from '@/components/icons/welcome-images/SuperPig.vue'
import SusPigUs from '@/components/icons/welcome-images/Grisebanker.vue'
import NinjaPig from '@/components/icons/welcome-images/NinjaPig.vue'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

const auth0 = useAuth0()
let isLoggedIn = false

onMounted(() => {
  if (auth0.isAuthenticated.value) {
    isLoggedIn = true
  }
})

const goToAuth0 = () => {
  if (isLoggedIn) {
    router.push({ name: 'dashboard' })
  } else {
    auth0.loginWithRedirect()
  }
}

watch([auth0.isLoading, auth0.error], () => {
  if (auth0.isLoading.value || auth0.error.value) return
  if (auth0.isAuthenticated.value) {
    isLoggedIn = true
  }
})
</script>
