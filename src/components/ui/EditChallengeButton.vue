<template>
  <Button variant="ghost" size="icon" @click="redirect">
    <slot />
  </Button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Button } from './button'

const router = useRouter()
const props = defineProps<{
  id: string
}>()
const redirect = () => {
  router.push(`/utfordring/${props.id}`)
}
</script>

<style></style>
