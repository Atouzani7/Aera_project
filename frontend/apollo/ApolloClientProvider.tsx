"use client";

import {
    ApolloClient,
    InMemoryCache,
    createHttpLink,
} from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { setContext } from "@apollo/client/link/context";
import { useMemo } from "react";

export default function ApolloClientProvider({ children }: { children: React.ReactNode }) {

    const API_URL =
        typeof window !== "undefined"
            ? `http://${window.location.hostname}:4001/graphql`
            : "http://backend:4001/graphql";

    const client = useMemo(() => {
        const httpLink = createHttpLink({
            uri: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4001/graphql",
        });

        const authLink = setContext((_, { headers }) => {
            const token =
                typeof window !== "undefined"
                    ? localStorage.getItem("token")
                    : null;


            return {
                headers: {
                    ...headers,
                    authorization: token ? `Bearer ${token}` : "",
                },
            };
        });

        return new ApolloClient({
            link: authLink.concat(httpLink),
            cache: new InMemoryCache(),
        });
    }, []);

    return <ApolloProvider client={client}>{children}</ApolloProvider>;
}