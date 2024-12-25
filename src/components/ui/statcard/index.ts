import { cva, type VariantProps } from 'class-variance-authority'

export const statcardVariants = cva('', {
  variants: {
    variant: {
      default: 'p-3 md:px-7 flex flex-col rounded-full w-full bg-card border border-card-border  min-w-36',
      small:
        'text-sm font-medium leading-none py-2 px-6 flex flex-col gap-1 rounded-full bg-card border w-full min-w-36'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
})

export type StatcardVariants = VariantProps<typeof statcardVariants>
