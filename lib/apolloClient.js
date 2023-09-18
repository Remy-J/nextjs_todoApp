import fetch from 'cross-fetch'
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  link: new HttpLink({ uri: 'http://localhost:9002/graphql', fetch }),
  credentials: 'same-origin',
  cache: new InMemoryCache(),
})
