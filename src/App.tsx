import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { createApolloClient } from './client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { darkTheme } from '@/utils/muiTheme';

import ChatGPTComponent from './components/ChatGPTComp';

function App() {
  const graphqlEndpoint = 'https://openai-graphql-api.harlanhai7023.workers.dev';
    // 创建 Apollo Client 实例
  const client = createApolloClient(graphqlEndpoint);
  // const workerUrl = 'https://chatgpt-proxy.harlanhai7023.workers.dev';
  // 使用相对路径，会通过 Webpack 代理转发
  const workerUrl = '/api';

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <ChatGPTComponent />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
