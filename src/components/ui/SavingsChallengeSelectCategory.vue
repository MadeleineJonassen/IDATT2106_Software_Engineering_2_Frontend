<script setup lang="ts">
import { defineEmits } from 'vue'
import { Button } from '@/components/ui/button'
import type { TransactionCategoryDto } from '@/lib/api'
import { Skeleton } from '@/components/ui/skeleton'
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const emit = defineEmits(['item-selected'])

const props = defineProps<{
  categories?: TransactionCategoryDto[]
}>()

const selectCategory = (category: number) => {
  emit('item-selected', category)
}
</script>
<template>
  <div class="animate-slide-in">
    <CardHeader>
      <CardTitle>Velg en kategori</CardTitle>
      <CardDescription>I hvilken kategori ønsker du å spare penger?</CardDescription>
    </CardHeader>
    <CardContent class="h-fit">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2.5 py-4">
        <Button
          v-for="(category, index) in categories"
          :key="index"
          variant="secondary"
          size="lg"
          class="w-full"
          @click="() => selectCategory(category?.id as number)"
        >
          {{ category?.name }}
        </Button>
        <template v-if="categories?.length == 0 || !categories">
          <Skeleton
            v-for="(n, i) in Array(6).fill(null)"
            :key="i"
            class="p-3 h-12 md:w-80 w-full rounded-full"
          />
        </template>
      </div>
    </CardContent>
  </div>
</template>
