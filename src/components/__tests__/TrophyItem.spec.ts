import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import TrophyItem from '../ui/TrophyItem.vue'
import TierLabel from '../ui/TierLabel.vue'

const trophyFixture = {
  title: 'Badge name',
  type: 0,
  progress: 50,
  progressBar: true,
  tiers: [
    {
      tier: 1,
      description: 'Being a cool person for 6 days straight',
      progress: 25
    },
    {
      tier: 2,
      description: 'Being a cool person for 12 days straight',
      progress: 50
    }
  ]
}

describe('TrophyItem', () => {
  it('Renders properly', () => {
    const wrapper = mount(TrophyItem, {
      props: {
        title: 'Badge name',
        type: 0,
        description: 'Wow! Well done!'
      }
    })
    expect(wrapper.text()).toContain('Badge name')
  })

  it('Can display a progress bar', () => {
    const wrapper = mount(TrophyItem, {
      props: {
        ...trophyFixture
      }
    })

    expect(wrapper.findComponent({ name: 'Progress' }).exists()).toBe(true)
  })

  it('Displays tier labels', () => {
    const wrapper = mount(TrophyItem, {
      props: {
        ...trophyFixture
      }
    })

    const tierLabels = wrapper.findAllComponents({ name: 'TierLabel' })
    expect(tierLabels[0].text()).toContain('Being a cool person for 6 days straight')
    expect(tierLabels[1].text()).toContain('Being a cool person for 12 days straight')
  })
})
