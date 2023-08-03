import { createHelpers } from 'vuex-map-fields'
import gql from 'graphql-tag'
import jwtDecode from 'jwt-decode'
import { apolloClient } from '@/vue-apollo'
// eslint-disable-next-line import/no-cycle
import router from '@/router'
import { login } from '@/graphql/mutations'
import { profileInfo } from '@/graphql/queries'

const { getAuthField, updateAuthField } = createHelpers({
  getterType: 'getAuthField',
  mutationType: 'updateAuthField',
})

export default {
  state: {
    userData: null,
    loadingLogin: false,
    loadingProfile: false,
    isAuthenticated: false,
    permission: {},
  },
  getters: {
    getAuthField,
    getUserData: state => state.userData,
  },
  mutations: {
    updateAuthField,
    setUserData(state, data) {
      state.userData = data
    },
  },
  actions: {
    login(state, payload) {
      return new Promise((resolve, reject) => {
        state.commit('updateAuthField', { path: 'loadingLogin', value: true })
        apolloClient.mutate({
          mutation: login,
          variables: payload,
        }).then(async result => {
          state.commit('updateAuthField', { path: 'isAuthenticated', value: true })
          localStorage.setItem('token', result.data.login.token)
          localStorage.setItem('refreshToken', result.data.login.refreshToken)
          // await state.dispatch('getProfileInfo')
          state.commit('updateAuthField', { path: 'loadingLogin', value: false })
          state.commit('updateAuthField', { path: 'loadingProfile', value: false })
          resolve(result)
        }).catch(err => {
          state.commit('updateAuthField', { path: 'loadingLogin', value: false })
          reject(err)
        })
      })
    },
    getProfileInfo(state) {
      return new Promise((resolve, reject) => {
        state.commit('updateAuthField', { path: 'loadingProfile', value: true })
        apolloClient.query({
          query: profileInfo,
          fetchPolicy: 'no-cache',
        }).then(result => {
          state.commit('updateAuthField', { path: 'loadingProfile', value: false })
          state.commit('updateAuthField', { path: 'userData', value: result.data.profileInfo.user })
          state.commit('updateAuthField', { path: 'permission', value: result.data.profileInfo.permission })
          state.commit('updateAuthField', { path: 'isAuthenticated', value: true })
          resolve(result)
        }).catch(err => {
          reject(err)
        })
      })
    },
    checkExpiredToken(state) {
      const token = jwtDecode(localStorage.getItem('token'))
      const now = new Date()
      const exp = new Date(token.exp * 1000 - 1000000)

      if (now > exp) {
        state.dispatch('refreshToken')
      }
    },
    refreshToken(state) {
      apolloClient.mutate({
        mutation: gql`
          mutation(
            $token: String!
          ) {
            refreshToken(token: $token) {
              status
              token
              refreshToken
            }
          }
        `,
        variables: {
          token: localStorage.getItem('refreshToken'),
        },
      }).then(result => {
        localStorage.setItem('token', result.data.refreshToken.token)
        localStorage.setItem('refreshToken', result.data.refreshToken.refreshToken)
        state.dispatch('app/initApp')
      }).catch(() => {
        state.dispatch('logout')
        router.replace('/login')
      })
    },
    logout(state) {
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
      state.commit('updateAuthField', { path: 'userData', value: null })
      state.commit('updateAuthField', { path: 'permission', value: {} })
      state.commit('updateAuthField', { path: 'isAuthenticated', value: false })
    },
  },
}
