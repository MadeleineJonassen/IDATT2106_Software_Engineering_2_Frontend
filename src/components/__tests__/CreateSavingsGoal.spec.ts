import { describe, expect, it } from 'vitest'
import SavingsGoalForm from '../ui/SavingsGoalForm.vue'
import { mount } from '@vue/test-utils'

describe('SavingsGoalForm', () => {
  it('renders correctly', () => {
    const wrapper = mount(SavingsGoalForm)
    expect(wrapper.exists()).toBe(true)
    const labels = wrapper.findAllComponents({ name: 'FormLabel' })
    expect(labels[0].text()).toContain('Navn*')
  })
})
