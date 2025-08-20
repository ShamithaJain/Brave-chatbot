import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { nhost } from './nhost'
import { NhostProvider } from '@nhost/react'
import { ApolloProvider } from '@apollo/client'
import { createApolloClient } from '@nhost/apollo'

// build Apollo client with Nhost auth
const apolloClient = createApolloClient({ nhost })

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NhostProvider nhost={nhost}>
      <ApolloProvider client={apolloClient}>
        <App />
      </ApolloProvider>
    </NhostProvider>
  </React.StrictMode>,
)
