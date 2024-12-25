import { mount } from '@vue/test-utils'
import { vi, describe, it, expect } from 'vitest'
import { Trophy } from 'lucide-vue-next'
import { type Router, useRouter } from 'vue-router'
import Leaderboard from '../ui/Leaderboard.vue'
import { type UserDto } from '../../lib/api'

vi.mock('vue-router')

describe('Leaderboard', () => {
  vi.mocked(useRouter as () => Partial<Router>).mockReturnValue({
    push: vi.fn()
  })

  const leaderBoardEntries: UserDto[] = [
    {
      username: 'olanordmann',
      imageUrl: '',
      score: 3000
    },
    {
      username: 'karinordmann',
      imageUrl: '',
      score: 2345
    },
    {
      username: 'lenahansen',
      imageUrl: '',
      score: 2000
    },
    {
      username: 'perolsen',
      imageUrl: '',
      score: 1800
    },
    {
      username: 'ingridjohansen',
      imageUrl: '',
      score: 1600
    },
    {
      username: 'anderspettersen',
      imageUrl: '',
      score: 1500
    }
  ]

  it('Renders everything correctly', () => {
    const wrapper = mount(Leaderboard, {
      props: {
        users: leaderBoardEntries
      }
    })

    // header renders title and trophy icon
    expect(wrapper.findComponent(Trophy).exists()).toBeTruthy()
    expect(wrapper.text()).toContain('Ledertavle')
    // renders avatars for each component
    expect(wrapper.findAllComponents({ name: 'Avatar' }).length).toBe(6)
    expect(wrapper.html()).toContain(leaderBoardEntries[0].username)
    expect(wrapper.html()).toContain(leaderBoardEntries[1].username)
    expect(wrapper.html()).toContain(leaderBoardEntries[2].username)

    /*    expect(wrapper.findAll('[data-test="position"]').length).toBe(6)
    expect(wrapper.findAll('[data-test="username"]').length).toBe(6)
    expect(wrapper.findAll('[data-test="streak"]').length).toBe(6)
    expect(wrapper.findAll('[data-test="score"]').length).toBe(6)*/
  })

  it('Click on leaderboard entry redirects to profile page', async () => {
    const wrapper = mount(Leaderboard, {
      props: {
        users: leaderBoardEntries
      }
    })

    expect(wrapper.findAll('[data-test="leaderboardEntry"]').length).toBe(6)
    const leaderBoardEntry = wrapper.find('[data-test="leaderboardEntry"]')

    await leaderBoardEntry.trigger('click')
    expect(useRouter().push).toHaveBeenCalledOnce()
    expect(useRouter().push).toHaveBeenCalledWith({
      name: 'user',
      params: { username: leaderBoardEntries[0].username }
    })
  })
})
