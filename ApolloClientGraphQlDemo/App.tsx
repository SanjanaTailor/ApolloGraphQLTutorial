import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from '@apollo/client';
import {Text, View, FlatList, StyleSheet} from 'react-native';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com/',
  cache: new InMemoryCache(), //The cache that Apollo Client should use to store query results locally
});

// Define the GraphQL query
const GET_COUNTRIES = gql`
  {
    countries {
      code
      name
      emoji
    }
  }
`;

// Component to display countries
const CountriesList = () => {
  const {loading, error, data} = useQuery(GET_COUNTRIES);

  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <FlatList
      data={data.countries}
      keyExtractor={item => item.code}
      renderItem={({item}) => (
        <View style={styles.item}>
          <Text>
            {item.name} {item.emoji}
          </Text>
        </View>
      )}
    />
  );
};

export default function App() {
  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <Text style={styles.title}>Countries</Text>
        <CountriesList />
      </View>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    marginVertical: 10,
  },
});
