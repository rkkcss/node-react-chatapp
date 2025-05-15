import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { UserType } from "../types/UserType";
import { useNavigate } from "react-router";
import { LoginFormType, loginQuery } from "../queries/AuthQueries";
import { meQuery } from "../queries/AccountQueries";
import { AxiosResponse } from "axios";

export const AUTH_TOKEN_STORAGE = "jhi-authenticationToken"

interface AuthContextType {
  user?: UserType | null;
  loading: boolean;
  error?: string;
  logout: () => void;
  login: (data: LoginFormType) => Promise<void>
}

type AuthProviderProps = PropsWithChildren;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserType | null>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchUser() {
    try {
      const { data } = await meQuery();
      setUser(data);
    } catch (err) {
      console.error('Failed to fetch user data:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (values: LoginFormType) => {
    try {
      const result = await loginQuery(values);
      const response = result as AxiosResponse;

      const bearerToken = response?.headers?.authorization;
      if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
        const jwt = bearerToken.slice(7);
        sessionStorage.setItem(AUTH_TOKEN_STORAGE, jwt);
      } else {
        throw new Error("Authorization token not found");
      }

      await fetchUser();

      navigate("/c/chat");
    } catch (err) {
      if (err instanceof Error) {
        if (err.message === "Authorization token not found") {
          setError("Authorization token is missing or invalid");
        } else if (err.message.includes("401")) {
          setError("Invalid credentials");
        } else {
          setError("Unexpected error occurred during login");
        }
      }
    }
  };


  const logout = () => {
    setUser(null);
    if (localStorage.getItem(AUTH_TOKEN_STORAGE)) {
      localStorage.removeItem(AUTH_TOKEN_STORAGE);
    }
    if (sessionStorage.getItem(AUTH_TOKEN_STORAGE)) {
      sessionStorage.removeItem(AUTH_TOKEN_STORAGE);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, logout, login }}>
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
