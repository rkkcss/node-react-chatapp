import React, { createContext, useContext } from "react";
import { ApolloError, gql, useQuery } from "@apollo/client";
import { User } from "../types/UserType";

interface AuthContextType {
  user: User;
  loading: boolean;
  error?: string | ApolloError;
  refetch: () => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ME_QUERY = gql`
  query Me {
    me {
      id
      email
    }
  }
`;

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { data, loading, error, refetch } = useQuery(ME_QUERY, { fetchPolicy: "network-only" });
  const value = { user: data?.me, loading, error, refetch };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
