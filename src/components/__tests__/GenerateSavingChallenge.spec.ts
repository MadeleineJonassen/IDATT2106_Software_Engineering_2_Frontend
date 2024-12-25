import { describe, expect, it } from 'vitest'
import GenerateSavingChallenge from '../ui/GenerateSavingChallenge.vue'
import { mount } from '@vue/test-utils'

describe('Check if strings are passed and displays properly', () => {
  it('renders properly', () => {
    const wrapper = mount(GenerateSavingChallenge, {
      props: {
        category: 'category123',
        oldExpenditure: 'oldExpend',
        newExpenditure: 'newExpend',
        difference: 'difference',
        startDate: '01-01-11',
        endDate: '02-02-22'
      }
    })
    expect(wrapper.text()).toContain('category123')
    expect(wrapper.text()).toContain('oldExpend')
    expect(wrapper.text()).toContain('newExpend')
    expect(wrapper.text()).toContain('difference')
    expect(wrapper.text()).toContain('01.01.11')
    expect(wrapper.text()).toContain('02.02.22')
  })
})
