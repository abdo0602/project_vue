/**
 * @vitest-environment happy-dom
 */

import {describe, it, expect} from 'vitest'
import {mount} from '@vue/test-utils'
import UserView from './User.vue'

describe('testing ...',()=>{
    it("render",()=>{
        const wrapper = mount(UserView);
        expect(wrapper.find('input').exists()).toBeTruthy();
    })
})