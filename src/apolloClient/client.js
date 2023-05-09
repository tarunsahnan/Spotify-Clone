const { ApolloClient, InMemoryCache } = require("@apollo/client");

const apolloClient = new ApolloClient({
  uri: "https://api.ss.dev/resource/api/",
  cache: new InMemoryCache(),
});

export default apolloClient;
