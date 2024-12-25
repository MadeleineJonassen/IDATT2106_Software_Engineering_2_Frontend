<script setup lang="ts">
import Logo from '@/components/icons/welcome-images/Logo.vue'
defineProps<{
  visible?: boolean
}>()
</script>
<template>
  <Teleport to="body">
    <div
      class="fixed inset-0 bg-card-solid top-0 left-0 z-50 flex items-center place-content-center"
      :class="visible ? undefined : 'animate-fade-out fill-mode-both pointer-events-none'"
    >
      <Logo class="animate-bounce h-1/2 w-1/2" />
    </div>
  </Teleport>
</template>
