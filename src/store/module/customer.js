import { getField, setField } from 'vuex-use-fields'
import { apolloClient } from '@/vue-apollo'
import { customers } from '@/graphql/queries'

export default {
  namespaced: true,
  state: {
    customers: [],
    customersCount: 0,
    customerFilter: {},
  },
  getters: {
    getField,
  },
  mutations: {
    setField,
  },
  actions: {
    getCustomers() {
      return new Promise((resolve, reject) => {
        apolloClient.query({
          query: customers,
          fetchPolicy: 'no-cache',
        }).then(result => {
          resolve(result)
        }).catch(err => {
          reject(err)
        })
      })
    },
  },
}
