import { describe, expect, it } from 'vitest'

import { mount } from '@vue/test-utils'
import EditUserDialog from '@/components/ui/EditUserDialog.vue'
import { mountWithDialogRoot } from './utils'

describe('EditUserDialog', () => {
  it('Displays edit button', () => {
    const wrapper = mountWithDialogRoot(EditUserDialog)
    expect(wrapper.text()).toContain('Rediger profil')
  })

  it('Open edit modal', async () => {
    const wrapper = mountWithDialogRoot(EditUserDialog)
    await wrapper.find('button').trigger('click')
    expect(wrapper.findComponent({ name: 'Dialog' }).props('open')).toBe(true)
  })

  it('Displays edit form', async () => {
    const wrapper = mountWithDialogRoot(EditUserDialog)
    await wrapper.find('button').trigger('click')

    const labels = wrapper.findAllComponents({ name: 'FormLabel' })
    expect(labels[0].text()).toContain('Navn')
    expect(labels[1].text()).toContain('Brukernavn')
  })
})
