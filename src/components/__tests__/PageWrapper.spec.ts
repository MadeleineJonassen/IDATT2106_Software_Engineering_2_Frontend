import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import PageWrapper from '../ui/PageWrapper.vue'

describe('Test pagewrapper', () => {
  it('renders properly', () => {
    const wrapper = mount(PageWrapper, { slots: { default: 'test' }, props: { title: 'Hello' } })
    expect(wrapper.text()).toContain('Hello')
    expect(wrapper.html()).toContain('test')
  })
})
