<script setup lang="ts">
//import { useRouter } from 'vue-router'

import { onMounted, ref } from 'vue'
import { columns } from '../components/saving-challenges/columns'
import DataTable from '../components/saving-challenges/DataTable.vue'
import { Button } from '../components/ui/button/'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import PageWrapper from '@/components/ui/PageWrapper.vue'
import { useAllSavingChallenges } from '@/lib/composables/savingChallenge'
import { useRouter } from 'vue-router'

const challenges = useAllSavingChallenges()

console.log(challenges.data.value)

const router = useRouter()
const createChallenge = () => {
  router.push({ name: 'create_challenge' })
}
</script>

<template>
  <PageWrapper title="Spareutfordringer">
    <Card class="w-full mx-auto h-fit animate-slide-in">
      <div class="container mx-auto">
        <DataTable :columns="columns" :data="challenges.data.value ?? []">
          <Button @click="createChallenge" class="w-full">Ny spareutfordring</Button>
        </DataTable>
      </div>
    </Card>
  </PageWrapper>
</template>
