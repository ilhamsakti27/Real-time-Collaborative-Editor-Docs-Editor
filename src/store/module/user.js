import { apolloClient } from '@/vue-apollo'
import { users } from '@/graphql/queries'

export default {
  state: {
    users: [],
    loadingUsers: false,
  },
  getters: {
    getUsers: state => state.users,
    getLoadingUsers: state => state.loadingUsers,
  },
  mutations: {
    setUsers(state, data) {
      state.users = data
    },
    setLoadingUsers(state, data) {
      state.loadingUsers = data
    },
  },
  actions: {
    getUsers(state) {
      state.commit('setLoadingUsers', true)
      apolloClient.query({
        query: users,
      }).then(result => {
        setTimeout(() => {
          state.commit('setLoadingUsers', false)
          state.commit('setUsers', result.data.users)
        }, 5000)
      })
    },
  },
}
