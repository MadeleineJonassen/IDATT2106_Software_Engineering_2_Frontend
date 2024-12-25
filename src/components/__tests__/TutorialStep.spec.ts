import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import PageWrapper from '../ui/TutorialStep.vue'

describe('check if strings are passed properly', () => {
  it('renders properly', () => {
    const wrapper = mount(PageWrapper, {
      props: { number: '1', heading: 'test', description: 'Hello' }
    })
    expect(wrapper.text()).toContain('1')
    expect(wrapper.text()).toContain('test')
    expect(wrapper.text()).toContain('Hello')
  })
})
