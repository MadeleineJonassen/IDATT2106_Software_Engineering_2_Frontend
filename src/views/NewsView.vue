<script setup lang="ts">
import PageWrapper from '@/components/ui/PageWrapper.vue'
import { Card, CardContent } from '@/components/ui/card'
import NewsCard from '@/components/ui/NewsCard.vue'
import NewsPageSkeleton from '@/components/ui/NewsPageSkeleton.vue'
import { useNews } from '@/lib/composables/news'

const { data, isLoading } = useNews()
</script>
<template>
  <PageWrapper class="" title="Nyheter">
    <Card class="animate-slide-in">
      <CardContent class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <NewsCard
          :title="article.title ?? ''"
          :img="article.imageUrl ?? ''"
          :url="article.url ?? ''"
          :source="article.source ?? ''"
          :is-free="article.free ?? true"
          v-for="(article, n) in data"
          :key="n"
        />
        <NewsPageSkeleton v-if="isLoading" />
      </CardContent>
    </Card>
  </PageWrapper>
</template>
