import Vue from 'vue'
import Vuex from 'vuex'
import Steps from './modules/Steps'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    Steps
  },
  getters
})

export default store
