import { GET_CLIENT_BY_USERID } from "@/graphQL/queries/client.queries";
import { useQuery } from "@apollo/client/react";

type Client = {
  id: string;
  name: string;
  lastname: string;
  email: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  postalCode: string;
  createdAt: string;
  updatedAt: string;
};

type GetMyClientsResponse = {
  findMyClients: Client[];
};

export default function useMyClients() {
  const { data, loading, error } =
    useQuery<GetMyClientsResponse>(GET_CLIENT_BY_USERID);

  return {
    clients: data?.findMyClients || [],
    loading,
    error,
  };
}
