import '@/plugins/vue-composition-api'
import '@/styles/styles.scss'
import Vue from 'vue'
import VueAnimXYZ from '@animxyz/vue'
import '@animxyz/core'
import Notifications from 'vue-notification'
import { apolloProvider } from '@/vue-apollo'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify'
import App from './App.vue'

import './tailwind.css'

Vue.use(VueAnimXYZ)
Vue.use(Notifications)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  apolloProvider,
  render: h => h(App),
}).$mount('#app')
