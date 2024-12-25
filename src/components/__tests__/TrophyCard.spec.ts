import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import TrophyCard from '../ui/TrophyCard.vue'

describe('TrophyCard', () => {
  it('Renders properly', () => {
    const wrapper = mount(TrophyCard, {
      props: {
        trophies: [
          {
            title: 'Trophy 1',
            description: 'Description 1',
            type: 0
          }
        ]
      }
    })
    expect(wrapper.text()).toContain('Troféer')
    expect(wrapper.text()).toContain('Trophy 1')
  })
})
