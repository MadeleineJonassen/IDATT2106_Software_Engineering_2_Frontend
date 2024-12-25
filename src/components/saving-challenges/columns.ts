import { h } from 'vue'
import { ArrowUpDown } from 'lucide-vue-next'
import { Button } from '../ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '../ui/badge'
import type { ColumnDef } from '@tanstack/vue-table'
import type { SavingChallengeResponseDto } from '@/lib/api'
import { format } from 'date-fns'
import { number } from 'zod'
import SavingsChallengeTableProgress from '@/components/saving-challenges/SavingsChallengeTableProgress.vue'

//TODO: hide finished saving challenges

export const columns: ColumnDef<SavingChallengeResponseDto>[] = [
  {
    accessorKey: 'category',
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
          class: 'p-2 m-0'
        },
        () => ['Spareutfordring', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })]
      )
    },
    accessorFn: (data) => {
      return `Bruk ${data.expectedExpense} kr på ${(data.transactionCategory?.name as string).toLowerCase()}`
    }
  },

  {
    accessorKey: 'currentSpending',
    enableHiding: false,
    header: () => h('div', 'forbruk'),
    cell: ({ row }) => {
      const currentSpending: number = Number(row.original.currentSpending)
      const plannedSpending: number = Number(row.original.expectedExpense)
      return h(
        'div',
        h(SavingsChallengeTableProgress, {
          progressNum: currentSpending,
          totalNum: plannedSpending
        })
      )
    }
  },
  {
    accessorKey: 'startDate',
    //TODO: indicate which saving challenges have begun
    enableHiding: false,
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
        },
        () => ['datoer', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })]
      )
    },
    accessorFn: (data) => {
      return `${format(data.startDate?.toString() as string, 'yyyy/dd/MM')} - ${format(data.endingDate?.toString() as string, 'yyyy/dd/MM')}`
    }
    //TODO: consider date format
  }
]
