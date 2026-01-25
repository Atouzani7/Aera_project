"use client";

import {
    ApolloClient,
    InMemoryCache,
    createHttpLink,
} from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { setContext } from "@apollo/client/link/context";
import { useMemo } from "react";

const httpLink = createHttpLink({
    uri:
        process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ??
        "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
    const token =
        typeof window !== "undefined"
            ? localStorage.getItem("token")
            : null;
    console.log("ApolloClientProvider - Token utilisé pour les requêtes :", token);
    // 🚫 pas de header Authorization si pas de token
    if (!token) {
        return { headers };
    }

    return {
        headers: {
            ...headers,
            authorization: `Bearer ${token}`,
        },
    };
});


const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default function ApolloClientProvider({ children }: { children: React.ReactNode }) {
    const client = useMemo(() => {
        const httpLink = createHttpLink({
            uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ?? "http://localhost:4000/graphql",
        });

        const authLink = setContext((_, { headers }) => {
            const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
            return {
                headers: {
                    ...headers,
                    authorization: token ? `Bearer ${token}` : "",
                }
            }
        });

        return new ApolloClient({
            link: authLink.concat(httpLink),
            cache: new InMemoryCache(),
        });
    }, []);

    return <ApolloProvider client={client}>{children}</ApolloProvider>;
}