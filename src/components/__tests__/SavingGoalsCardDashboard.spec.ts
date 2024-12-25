import { mount } from '@vue/test-utils'
import { vi, describe, it, expect } from 'vitest'
import SavingGoalsCardDashboard from '../ui/SavingGoalsCardDashboard.vue'
import { type SavingGoalDtoDetailsResponse, SavingGoalDtoGeneralResponse } from '../../lib/api'
import { Button } from '../ui/button'
import SavingGoalsDashboardPopover from '../ui/SavingGoalsDashboardPopover.vue'

vi.mock('../../lib/composables/savingGoal')

describe('SavingGoalsCardDashboard', () => {
  const mockGoals: SavingGoalDtoGeneralResponse[] = [
    {
      id: 1,
      title: 'Tur til Spania',
      goalSum: 12000,
      amountSaved: 7000
    },
    {
      id: 2,
      title: 'Nye sko',
      amountSaved: 400,
      goalSum: 900
    }
  ]
  const savingGoalDetailed: SavingGoalDtoDetailsResponse = {
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
  }
  const savingGoalDetailed2: SavingGoalDtoDetailsResponse = {
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

  it('renders components correctly', () => {
    const wrapper = mount(SavingGoalsCardDashboard, {
      props: {
        savingGoals: mockGoals,
        activeSavingGoal: savingGoalDetailed
      }
    })

    expect(wrapper.findComponent({ name: 'Card' }).exists()).toBeTruthy()
    expect(wrapper.findComponent({ name: 'SavingGoalsDashboardPopover' }).exists()).toBeTruthy()
    expect(wrapper.find('[data-test="containerIfSavingGoals"]').exists()).toBeTruthy()
    expect(wrapper.findAllComponents({ name: 'Progress' }).length).toBe(3)
    expect(wrapper.findComponent({ name: 'CardTitle' }).text()).toContain(mockSavingGoals[0].title)
  })

  it("doesn't render content if user has no active saving goals", () => {
    const wrapper = mount(SavingGoalsCardDashboard, {
      props: {
        savingGoals: [],
        activeSavingGoal: savingGoalDetailed
      }
    })

    // Card renders and has text telling user there are no goals
    expect(wrapper.findComponent({ name: 'Card' }).exists()).toBeTruthy()
    expect(wrapper.findComponent({ name: 'Card' }).text()).toContain('ingen sparemål')

    // Popover not mounted, if saving goals is empty
    expect(wrapper.findComponent({ name: 'SavingGoalsDashboardPopover' }).exists()).toBeFalsy()
    // Progress bars not rendered if saving goals is empty
    expect(wrapper.findComponent({ name: 'Progress' }).exists()).toBeFalsy()
    // no saving goals content not rendered if saving goals is empty
    expect(wrapper.find('[data-test="containerIfSavingGoals"]').exists()).toBeFalsy()
  })

  it('renders popover content if chevron is clicked', async () => {
    const wrapper = mount(SavingGoalsCardDashboard, {
      props: {
        savingGoals: mockGoals,
        activeSavingGoal: savingGoalDetailed
      }
    })

    await wrapper.findComponent(Button).trigger('click')
    expect(wrapper.find('[data-test="popoverClickable"]').exists).toBeTruthy()
  })
})
