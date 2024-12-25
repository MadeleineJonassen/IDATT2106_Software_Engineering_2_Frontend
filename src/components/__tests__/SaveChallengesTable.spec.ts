import { describe, expect, it } from 'vitest'
//import { Button } from '../components/ui/button/'
import { mount } from '@vue/test-utils'
import DataTable from '../saving-challenges/DataTable.vue'
import { columns } from '../saving-challenges/columns'

describe('SavingChallengeTable', () => {
  it('renders correctly', () => {
    const wrapper = mount(DataTable, {
      props: {
        // @ts-ignore
        columns,
        data: []
      }
    })
    expect(wrapper.exists()).toBe(true)
  })

  // TODO - Test more aspects of the component
})
