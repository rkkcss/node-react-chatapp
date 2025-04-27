import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { UserType } from "../types/UserType";
import { useNavigate } from "react-router";
import { logoutQuery } from "../queries/AuthQueries";
import { meQuery } from "../queries/AccountQueries";

interface AuthContextType {
  user?: UserType | null;
  loading: boolean;
  error?: string;
  logout: () => void;
}

type AuthProviderProps = PropsWithChildren;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserType | null>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    meQuery()
      .then(res => {
        setUser(res.data);
        navigate("/c/chat");
        setLoading(false);
      })
      .catch(err => {
        setError(err)
      });
  }, [navigate]);

  const logout = () => {
    setUser(null);
    logoutQuery()
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, logout }}>
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
