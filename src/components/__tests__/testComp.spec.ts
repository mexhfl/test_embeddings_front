import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import testComp from '../testComp.vue'

describe('testComp', () => {
  it('renders properly', () => {
    const wrapper = mount(testComp, { props: { msg: 'Hello Vitest' } })
      expect(wrapper.text()).toContain('Hello Vitest')
  })
})
