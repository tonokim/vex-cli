const state = {
  text: '123'
}

const getters = {}

const actions = {
  setText: ({ commit }, text) => commit('setText', text),
  setTextAsync ({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('setText', 'async123')
        resolve()
      }, 1000)
    })
  }
}

const mutations = {
  setText (state, text) {
    state.text = text
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}