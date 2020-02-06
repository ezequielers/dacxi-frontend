export const Steps = {
  state: {
    step1: null,
    step2: null,
    step3: null
  },
  mutations: {
    SET_STEP1: (state, payload) => {
      state.step1 = payload
    },
    SET_STEP2: (state, payload) => {
      state.step2 = payload
    },
    SET_STEP3: (state, payload) => {
      state.step3 = payload
    }
  },
  actions: {
    getStep1 (state) {
      return state.step1
    },
    setStep1 ({ commit }, data) {
      commit('SET_STEP1', data.step)
    },
    getStep2 (state) {
      return state.step2
    },
    setStep2 ({ commit }, data) {
      commit('SET_STEP2', data.step)
    },
    getStep3 (state) {
      return state.step3
    },
    setStep3 ({ commit }, data) {
      commit('SET_STEP3', data.step)
    }
  }
}

export default Steps
