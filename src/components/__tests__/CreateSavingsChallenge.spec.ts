import { describe, expect, it } from 'vitest'
import SavingsGoalForm from '../ui/SavingsGoalForm.vue'
import { mount } from '@vue/test-utils'
import SavingsChallengeForm from '../ui/SavingsChallengeForm.vue'
import SavingsChallengeSelectCategory from '../ui/SavingsChallengeSelectCategory.vue'
/*
describe('SavingsChallengeForm', () => {
  it('renders correctly', () => {
    const wrapper = mount(SavingsChallengeForm)
    expect(wrapper.exists()).toBe(true)
    const labels = wrapper.findAllComponents({ name: 'FormLabel' })
    expect(labels[0].text()).toContain('Tidligere forbruk*')
  })
})*/

describe('SavingsChallengeSelectCategory', () => {
  it('renders correctly', () => {
    const wrapper = mount(SavingsChallengeSelectCategory, {
      props: {
        categories: [
          {
            name: 'Category 1',
            id: 0
          }
        ]
      }
    })

    expect(wrapper.exists()).toBe(true)
    const buttons = wrapper.findAllComponents({ name: 'Button' })
    expect(buttons[0].text()).toContain('Category 1')
  })
})
