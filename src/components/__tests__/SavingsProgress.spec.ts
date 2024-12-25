import { describe, expect, it } from 'vitest'

import { mount } from '@vue/test-utils'
import SavingsGoalProgress from '../ui/SavingsProgress.vue'

describe('SavingsProgress', () => {
  it('Displays correct text', () => {
    const wrapper = mount(SavingsGoalProgress, {
      props: {
        title: "Spaniatur",
        target: 10,
        current: 5,
      }
    })
    expect(wrapper.text()).toContain('Spaniatur');
    expect(wrapper.text()).toContain('10');
    expect(wrapper.text()).toContain('5');
  })
})
