"use client";

import {
    ApolloClient,
    InMemoryCache,
    HttpLink,
} from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";

const client = new ApolloClient({
    link: new HttpLink({
        uri: "http://localhost:4000/graphql" || process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "http://localhost:3000/",
    }),
    cache: new InMemoryCache(),
});

export default function ApolloClientProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
