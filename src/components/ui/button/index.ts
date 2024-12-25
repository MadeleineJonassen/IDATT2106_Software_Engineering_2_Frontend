import { type VariantProps, cva } from 'class-variance-authority'

export { default as Button } from './Button.vue'

export const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 gap-1  ',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        destructive: 'bg-destructive text-destructive-foreground',
        outline:
          'border border-input text-foreground bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        ghost:
          'hover:bg-accent hover:text-accent-foreground active:translate-x-0 active:translate-y-0',
        link: 'text-primary underline-offset-4 hover:underline active:translate-x-0 active:translate-y-0'
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3 py-1',
        lg: 'h-11 px-8 py-3',
        icon: 'h-10 w-10'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export const buttonShadowVariants = cva('absolute w-full h-full rounded-full top-1 left-1 z-0', {
  variants: {
    variant: {
      default: 'bg-primary-shade',
      destructive: 'bg-destructive-shade',
      outline: 'bg-secondary-shade',
      secondary: 'bg-secondary-shade',
      ghost: 'hidden',
      link: 'text-primary underline-offset-4 hover:underline'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
})

export type ButtonVariants = VariantProps<typeof buttonVariants>
