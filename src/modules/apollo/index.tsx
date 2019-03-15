import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {RestLink} from 'apollo-link-rest';
import fetch from 'unfetch';
// setup your `RestLink` with your endpoint
const restLink = new RestLink({
    uri: 'https://swapi.co/api/',
    customFetch: fetch,
});

// setup your client
const client = () => {
    return new ApolloClient({
        link: restLink,
        cache: new InMemoryCache(),
    });
};

export default {
    client,
    routes: [],
};
