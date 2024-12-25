import { mount } from '@vue/test-utils'
import SavingsCard, { type SavingGoal } from '../ui/SavingsCard.vue'
import { describe, it, expect } from 'vitest'
import TierLabel from '../ui/TierLabel.vue'
describe('TierLabel', () => {
  it('Renders properly', () => {
    const wrapper = mount(TierLabel, {
      props: {
        tier: 1,
        type: 0,
        label: 'Tier 1'
      }
    })
    expect(wrapper.text()).toContain('Tier 1')
  })
})
