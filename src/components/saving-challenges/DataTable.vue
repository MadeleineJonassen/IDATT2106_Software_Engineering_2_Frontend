<script setup lang="ts" generic="TData, TValue">
//TODO: set pagination nr amt
import type { ColumnDef, SortingState } from '@tanstack/vue-table'
import { valueUpdater } from '@/lib/utils'
import {
  FlexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable
} from '@tanstack/vue-table'
import { Button } from '../ui/button/'

import { h, ref } from 'vue'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

const props = defineProps<{
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}>()

const sorting = ref<SortingState>([])

const table = useVueTable({
  get data() {
    return props.data
  },
  get columns() {
    return props.columns
  },
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
  state: {
    get sorting() {
      return sorting.value
    }
  }
})

</script>

<template>
  <div>
    <div class="">
      <Table class="rounded-lg border-spacing-y-2 border-separate">
        <TableHeader>
          <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
                class="max-h-1"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody class="px-2">
          <template v-if="table.getRowModel().rows?.length">
            <TableRow
              v-for="row in table.getRowModel().rows"
              :key="row.id"
              :data-state="row.getIsSelected() ? 'selected' : undefined"
              class="data-row relative text-foreground  items-start"
            >
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id" class="text-nowrap">
                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
              </TableCell>
            </TableRow>
          </template>
          <template v-else>
            <TableRow>
              <TableCell :colSpan="columns.length" class="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </div>
    <div class="flex items-center py-4 md:flex-row flex-col gap-2.5">
      <div class="w-full md:w-fit mr-auto order-3 md:order-1">
        <slot />
      </div>
      <div class="flex gap-2.5 md:order-2 order-1 w-full place-content-end">
        <Button
          variant="secondary"
          :disabled="!table.getCanPreviousPage()"
          @click="table.previousPage()"
          class="w-full md:w-fit"
        >
          Forrige
        </Button>
        <Button
          variant="secondary"
          :disabled="!table.getCanNextPage()"
          @click="table.nextPage()"
          class="md:w-fit w-full"
        >
          Neste
        </Button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.data-row::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /*background-color: var(--card-solid);*/
  @apply bg-card-solid;
  transition: background-color 0.2s;
  border-radius: 10000rem;
  z-index: -1;
}
</style>
