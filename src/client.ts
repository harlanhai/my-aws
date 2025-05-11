import { ApolloClient, InMemoryCache, HttpLink, ApolloProvider, gql } from '@apollo/client';

// 创建 Apollo Client 实例
export const createApolloClient = (uri: string) => {
  return new ApolloClient({
    link: new HttpLink({
      uri, // GraphQL 服务器地址
      credentials: 'same-origin'
    }),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'network-only', // 不使用缓存
        errorPolicy: 'all',
      },
      query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      },
      mutate: {
        errorPolicy: 'all',
      },
    },
  });
};

// 发送消息的 GraphQL 变更操作
export const SEND_MESSAGE = gql`
  mutation SendMessage($input: String!) {
    sendMessage(input: $input) {
      result
      requestId
      timestamp
      error
    }
  }
`;

// 检查服务状态的查询
export const CHECK_STATUS = gql`
  query CheckStatus {
    status
  }
`;