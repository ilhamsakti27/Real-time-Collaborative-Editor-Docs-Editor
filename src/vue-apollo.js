import Vue from 'vue'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
import ApolloClient from 'apollo-client'
import { split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'
import { setContext } from 'apollo-link-context'
import { createUploadLink } from 'apollo-upload-client'
import { WebSocketLink } from './apollo-ws'

const wsLink = new WebSocketLink({
  url: process.env.VUE_APP_GRAPHQL_WS,
  connectionParams: () => ({
    token: `Bearer ${localStorage.getItem('token')}`,
  }),
})
const httpLink = createUploadLink({
  uri: process.env.VUE_APP_GRAPHQL_HTTP,
  connectionParams: () => ({
    token: `Bearer ${localStorage.getItem('token')}`,
  }),
  headers: {
    Authentication: `Bearer ${localStorage.getItem('token')}`,
  },
})
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token')
  // return the headers to the context so httpLink can read them

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})
const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query)

    return definition.kind === 'OperationDefinition'
      && definition.operation === 'subscription'
  },
  wsLink,
  httpLink,
)
// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: authLink.concat(link),
  cache,
})
export const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

Vue.use(VueApollo)
