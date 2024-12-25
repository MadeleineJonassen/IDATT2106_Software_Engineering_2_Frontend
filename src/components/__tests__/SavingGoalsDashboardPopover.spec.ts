import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import SavingGoalsDashboardPopover from '@/components/ui/SavingGoalsDashboardPopover.vue'
import { Button } from '@/components/ui/button'
import { type SavingGoalDtoDetailsResponse } from '../../lib/api'
import { PopoverContent } from 'radix-vue'
import { Avatar } from '../ui/avatar'
import { Popover } from '../ui/popover'

describe('SavingGoalsDashboardPopover', () => {
  const mockSavingGoals: SavingGoalDtoDetailsResponse[] = [
    {
      id: 1,
      title: 'Tur til Spania',
      goalSum: 12000,
      amountSaved: 7000,
      savingChallenges: [
        {
          id: 1,
          currentSpending: 300,
          spendingGoal: 500,
          transactionCategory: {
            id: 1,
            name: 'Mat'
          }
        },
        {
          id: 2,
          currentSpending: 1050,
          spendingGoal: 1200,
          transactionCategory: {
            id: 2,
            name: 'Transport'
          }
        }
      ],
      destinationBankAccount: undefined,
      sourceBankAccount: undefined
    },
    {
      id: 2,
      title: 'Nye sko',
      amountSaved: 400,
      goalSum: 900,
      savingChallenges: [
        {
          id: 3,
          currentSpending: 230,
          spendingGoal: 500,
          transactionCategory: {
            id: 3,
            name: 'Kaffe'
          }
        },
        {
          id: 4,
          currentSpending: 200,
          spendingGoal: 400,
          transactionCategory: {
            id: 4,
            name: 'Godteri'
          }
        }
      ],
      destinationBankAccount: undefined,
      sourceBankAccount: undefined
    }
  ]

  it('opens when trigger is clicked', async () => {
    const wrapper = mount(SavingGoalsDashboardPopover, {
      props: {
        savingGoals: mockSavingGoals,
        activeGoalId: '1'
      }
    })

    expect(wrapper.findComponent(Popover).props('open')).toBeFalsy()
    expect(wrapper.findComponent(PopoverContent).exists()).toBeFalsy()

    const triggerBtn = wrapper.findComponent(Button)
    expect(triggerBtn.exists()).toBeTruthy()
    await triggerBtn.trigger('click')

    expect(wrapper.findComponent(Popover).props('open')).toBeTruthy()
    expect(wrapper.findComponent(PopoverContent).exists()).toBeTruthy()
  })

  it('renders correctly', async () => {
    const wrapper = mount(SavingGoalsDashboardPopover, {
      props: {
        savingGoals: mockSavingGoals,
        activeGoalId: '1'
      }
    })
    // trigger popover
    const triggerBtn = wrapper.findComponent(Button)
    expect(triggerBtn.exists()).toBeTruthy()
    await triggerBtn.trigger('click')

    expect(wrapper.findComponent({ name: 'Avatar' }).exists()).toBeTruthy()

    const popoverContent = wrapper.findComponent(PopoverContent)
    expect(popoverContent.exists()).toBeTruthy()
    expect(popoverContent.text()).toContain('Dine sparemål')
    expect(popoverContent.text()).toContain('Tur til Spania')
    expect(popoverContent.findAllComponents(Avatar).length).toBe(2)
    expect(popoverContent.html()).toContain('h3')
    expect(popoverContent.findAll('[data-test="popoverClickable"]').length).toBe(2)
  })

  it('emits new saving goal index when saving goal is clicked', async () => {
    const wrapper = mount(SavingGoalsDashboardPopover, {
      props: {
        savingGoals: mockSavingGoals,
        activeGoalId: '1'
      }
    })

    await wrapper.findComponent(Button).trigger('click')

    const popoverContent = wrapper.findComponent(PopoverContent)

    const savingGoalButtons = popoverContent.findAll('[data-test="popoverClickable"]')
    expect(savingGoalButtons.length).toBe(2)

    await savingGoalButtons[1].trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted()).toHaveProperty('changeSavingGoal')
    expect(wrapper.emitted().changeSavingGoal[0]).toEqual(['2'])
  })
})
