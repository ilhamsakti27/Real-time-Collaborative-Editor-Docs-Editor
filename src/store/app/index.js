export default {
  namespaced: true,
  state: {
    shallContentShowOverlay: false,
  },
  getters: {},
  mutations: {
    TOGGLE_CONTENT_OVERLAY(state, value) {
      state.shallContentShowOverlay = value !== undefined ? value : !state.shallContentShowOverlay
    },
  },
  actions: {
    initApp(state) {
      state.dispatch('checkExpiredToken', '', { root: true })
      state.dispatch('getProfileInfo', '', { root: true })
    },
  },
}
