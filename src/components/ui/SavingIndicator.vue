<script setup lang="ts">
import { CheckIcon, X } from 'lucide-vue-next'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'

const props = defineProps<{
  isError: boolean
  isSaving: boolean
}>()
</script>
<template>
  <div class="flex gap-2.5 items-center">
    <CheckIcon v-if="!isError && !isSaving" />
    <X v-else-if="isError" class="text-destructive" />
    <LoadingSpinner v-else-if="isSaving" class="text-yellow-700" />
    <span class="font-semibold">
      <template v-if="!isError && !isSaving"><span> Endringene er lagret! </span> </template>
      <template v-else-if="isError">
        <span class="text-destructive">Kunne ikke lagre endringene!</span>
      </template>
      <template v-else-if="isSaving"><span class="text-yellow-700">Lagrer 🥁</span></template>
    </span>
  </div>
</template>
