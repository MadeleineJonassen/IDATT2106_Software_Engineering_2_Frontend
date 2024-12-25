import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import BottomBar from '../navigation/BottomBar.vue'
import { BookmarkCheck, LandPlot } from 'lucide-vue-next'
import { type Router, useRouter } from 'vue-router'

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}

vi.mock('vue-router')
describe('Check if bottom bar renders props', () => {
  vi.mocked(useRouter as () => DeepPartial<Router>).mockReturnValue({
    push: vi.fn(),
    currentRoute: {
      value: {
        name: ''
      }
    }
  })
  it('renders properly', () => {
    const wrapper = mount(BottomBar, {
      props: {
        navButtons: [
          {
            label: 'Button 1',
            icon: BookmarkCheck,
            name: 'buttonroute'
          },
          {
            label: 'Button 2',
            icon: LandPlot,
            name: 'buttonroute2'
          }
        ]
      }
    })

    expect(wrapper.findComponent({ name: 'BottomBar' }).exists()).toBeTruthy()
    expect(wrapper.findAllComponents({ name: 'BottomBarButton' }).length).toBe(2)
    const buttons = wrapper.findAllComponents({ name: 'BottomBarButton' })
    expect(buttons[0].text()).toContain('Button 1')
    expect(buttons[1].text()).toContain('Button 2')
  })
})
