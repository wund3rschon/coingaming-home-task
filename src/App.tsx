import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { injectGlobal } from '@emotion/css';
import { FC } from 'react';

import Header from './components/Header';
import Main from './components/Main';

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
injectGlobal`
  * {
    border: 0;
    box-sizing: border-box;
    margin: 0;
    outline: 0;
    padding: 0;
  }

  body {
    background: white;
    font: 400 16px/1.333333 'IBM Plex Sans', sans-serif;
    height: 100vh;
  }

  input,
  button {
    font: inherit;
  }
`;

const client = new ApolloClient({
  uri: 'https://api.blocktap.io/graphql',
  cache: new InMemoryCache(),
});

const App: FC = () => (
  <ApolloProvider client={client}>
    <Header />
    <Main />
  </ApolloProvider>
);

export default App;
