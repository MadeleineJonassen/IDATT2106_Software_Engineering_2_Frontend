/*import { mount, VueWrapper } from '@vue/test-utils'
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest'

import { useRouter } from 'vue-router'

import ProfileImagePopover from '../ui/ProfileImagePopover.vue'
import router from '../../router'
import { ref } from 'vue'
import { type Auth0VueClient, useAuth0 } from '@auth0/auth0-vue'
*/
import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import PageWrapper from '../ui/TutorialStep.vue'

describe('check if strings are passed properly', () => {
  it('renders properly', () => {
    const wrapper = mount(PageWrapper, { props: { number: '1', heading: "test", description: "Hello" } })
    expect(wrapper.text()).toContain("1")
    expect(wrapper.text()).toContain("test")
    expect(wrapper.text()).toContain("Hello")
  })
})
/*
vi.mock('vue-router')
vi.mock('@auth0/auth0-vue')


let wrapper: VueWrapper
describe('ProfileImagePopover', () => {
  vi.mocked(useRouter).mockReturnValue({
    ...router,
    push: vi.fn(),
  })

  // mocking auth0 must be done before mounting the component in tests
  vi.mocked(useAuth0 as () => Partial<Auth0VueClient>).mockReturnValue({
    user: ref({
      nickname: 'john'
    })
  })

  beforeEach(() => {
    wrapper = mount(ProfileImagePopover, {
      props: {
        avatarUrl: 'fake image url'
      }
    })
  })

  afterEach(() => {
    wrapper.unmount()
    vi.clearAllMocks()
  })

  it('Does not display popover content before triggered', () => {
    const popover = wrapper.findComponent({ name: 'Popover' })
    const statCardsBeforeClick = wrapper.findAllComponents({ name: 'StatCard' })

    expect(popover.props('open')).toBeFalsy()
    expect(popover.getCurrentComponent().isMounted).toBeTruthy()
    expect(statCardsBeforeClick.length).toBe(0)
  })

  it('Renders the stat cards after avatar is clicked', async () => {
    // click the user icon "Avatar" to trigger the popover
    await wrapper.findComponent({ name: 'Avatar' }).trigger('click')
    const statCards = wrapper.findAllComponents({ name: 'StatCard' })

    // Popover is set to open
    expect(wrapper.findComponent({ name: 'Popover' }).props('open')).toBeTruthy()
    // All stat-cards are rendered
    expect(statCards.length).toBe(3)
    expect(statCards[0].text()).toContain('Sparestreak')
    expect(statCards[1].text()).toContain('spareutfordringer')
    expect(statCards[2].text()).toContain('Penger spart')
  })

  it('Button to profile page renders when popover is triggered', async () => {
    await wrapper.findComponent({ name: 'Avatar' }).trigger('click')

    const button = await wrapper.findComponent({ name: 'Button' })

    expect(button.text()).toContain('Min profil')
  })

  it('Pushes route to profile page when to profile button is clicked', async () => {
    await wrapper.findComponent({ name: 'Avatar' }).trigger('click')
    await wrapper.findComponent({ name: 'Button' }).trigger('click')

    expect(useRouter().push).toHaveBeenCalledWith({
      name: 'user',
      params: {
        username: 'john'
      }
    })
  })
})
*/