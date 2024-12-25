import { mount } from '@vue/test-utils'
import { DialogRoot } from 'radix-vue'

export function mountWithDialogRoot(Component: unknown, options = {}) {
  return mount(DialogRoot, {
    ...options,
    slots: {
      // @ts-ignore
      default: Component
    }
  })
}
