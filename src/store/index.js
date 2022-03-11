
import Vue from "vue"
import Vuex from "vuex"

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

// 安装vuex插件
Vue.use(Vuex)

// 创建store对象
const store = new Vuex.Store({
    state: {
        cartList: []
    },
    // mutations内只是更新操作，不具有判断等复杂逻辑。可以跟踪
    mutations,
    // actions不可以跟踪
    actions,
    getters
})

// 挂载
export default store;