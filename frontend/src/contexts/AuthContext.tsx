import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { ApolloError, gql, useMutation, useQuery } from "@apollo/client";
import { UserType } from "../types/UserType";
import { useNavigate } from "react-router";

interface AuthContextType {
  user?: UserType | null;
  loading: boolean;
  error?: string | ApolloError;
  refetch: () => void;
  logout: () => void;
}

type AuthProviderProps = PropsWithChildren;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ME_QUERY = gql`
  query Me {
    me {
      id
      email
    }
  }
`;

const LOGOUT = gql`
    mutation logout {
        logout
    }
`

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserType | null>(null);
  const navigate = useNavigate();

  const [logoutMutation] = useMutation(LOGOUT, {
    onCompleted: () => {
      navigate("/login", { replace: true });
    },
  });

  const { data, loading, error, refetch } = useQuery(ME_QUERY, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      // Ha sikerült a lekérés, akkor beállítjuk a felhasználót.
      if (data?.me) {
        setUser(data.me);
      }
    }
  });

  useEffect(() => {
    // Ez biztosítja, hogy a user állapot mindig frissüljön.
    if (data?.me) {
      setUser(data.me);
    }
  }, [data]);

  const logout = () => {
    setUser(null);
    logoutMutation();
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, refetch, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
