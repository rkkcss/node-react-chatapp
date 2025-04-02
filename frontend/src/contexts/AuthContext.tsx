import React, { createContext, useContext } from "react";
import { gql, useQuery } from "@apollo/client";

interface AuthContextType {
  user: any;
  loading: boolean;
  error: any;
  refetch: () => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const ME_QUERY = gql`
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
