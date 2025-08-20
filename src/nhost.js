import { ApolloClient, InMemoryCache, createHttpLink, split } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import { setContext } from '@apollo/client/link/context';
import { NhostClient } from '@nhost/react';

export const nhost = new NhostClient({
  subdomain: 'nwtjynkwiqgbpxghbecl', // your Nhost subdomain
  region: 'ap-south-1',               // your region (Mumbai)
});


// HTTP link
const httpLink = createHttpLink({
  uri: 'https://nwtjynkwiqgbpxghbecl.hasura.ap-south-1.nhost.run/v1/graphql',
});

// WebSocket link
const wsLink = new GraphQLWsLink(
  createClient({
    url: 'wss://nwtjynkwiqgbpxghbecl.hasura.ap-south-1.nhost.run/v1/graphql',
    connectionParams: () => {
      const token = nhost.auth.getAccessToken();
      return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    },
  })
);

// Auth link
const authLink = setContext((_, { headers }) => {
  const token = nhost.auth.getAccessToken();
  return {
    headers: {
      ...headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
});

// Split link: WS for subscriptions, HTTP for queries/mutations
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  authLink.concat(httpLink)
);

// Apollo client
export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
