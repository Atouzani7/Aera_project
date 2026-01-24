"use client";

import { useAuth } from "@/src/app/hook/context/authContext";

export const useCurrentUser = () => {
  const { user, isLoading } = useAuth();

  console.log("useCurrentUser - user:", user);
  return {
    user,
    isLoading,
    isAuthenticated: !!user,
  };
};
