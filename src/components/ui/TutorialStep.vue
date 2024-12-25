<script setup lang="ts">
defineProps<{
    number?: string,
    heading: string,
    description: string
}>()
</script>

<template>
    <div class="flex gap-3 flex-1">
        <div class="scroll-m-20 text-4xl text-foreground font-bold tracking-tight lg:text-5xl">{{  number }}</div>
        <div class = "flex flex-col">
          <h3 class="scroll-m-20 text-2xl text-foreground font-bold tracking-tight"> {{ heading }}</h3>
          <h4 class="scroll-m-20 text-xl text-foreground tracking-tight max-w-96 min-w-48"> {{ description }}</h4>
        </div>
    </div>
</template>
