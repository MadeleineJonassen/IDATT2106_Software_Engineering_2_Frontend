import { mount } from '@vue/test-utils'
import SavingsCard, { type SavingGoal } from '../ui/SavingsCard.vue'
import { describe, it, expect } from "vitest";
describe('SavingsCard', () => {
  it('Renders', () => {
    const wrapper = mount(SavingsCard, {
      props: {
        title: "Sparemål",
        values: [
          {
            title: "Spaniatur",
            target: 10000,
            current: 5000
          }
        ] as SavingGoal[]
      }
    })

    expect(wrapper.text()).toContain("Sparemål");
    expect(wrapper.findComponent({ name: 'SavingsProgress' }).text()).toContain("Spaniatur")
  })

  it('Generates progress indicators', () => {
    const wrapper = mount(SavingsCard, {
      props: {
        title: "Sparemål",
        values: [
          {
            title: "Spaniatur",
            target: 10000,
            current: 5000
          }
        ] as SavingGoal[]
      }
    })

    expect(wrapper.findComponent({ name: 'SavingsProgress' }).text()).toContain("Spaniatur")
  })
})