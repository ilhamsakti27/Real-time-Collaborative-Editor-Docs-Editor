import { setupStore } from 'vuex-use-fields'
import appConfigStoreModule from '@core/@app-config/appConfigStoreModule'
import Vue from 'vue'
import Vuex from 'vuex'
import app from './app'
import auth from './module/auth'
import customer from './module/customer'
import user from './module/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    appConfig: appConfigStoreModule,
    app,
    auth,
    customer,
    user,
  },
  plugins: [setupStore],
})
