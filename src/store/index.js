/**
 * Created by Murphy on 2017/5/6.
 *  我们组装模块并导出 store 的地方
 */
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutation-types'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

/**全局的状态**/
const state={
  loginState:false,
  loginName:'',
  loginPwd:''
}

export default new Vuex.Store({
  state,  //单一状态树  store.state.loginState就可以访问到
  getters, // store 中的 state 中派生出一些状态 getters可以认为是 store 的计算属性
  actions,  //Action 提交的是 mutation，而不是直接变更状态。Action 可以包含任意异步操作
  mutations //更改 Vuex 的 store 中的状态的唯一方法是提交 mutation 。。。改变状态的方式是提交mutations，这是个同步的事物；
  /*  modules: {
   cart,
   products
   },*/
})
