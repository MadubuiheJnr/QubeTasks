import type { User } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import { queryClient } from "./react-query-provider";
import { useLocation, useNavigate } from "react-router";
import { publicRoutes } from "@/lib";
import { useUserProfileQuery } from "@/hooks/use-user";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: any) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);

  const navigate = useNavigate();
  const currentPath = useLocation().pathname;
  const isPublicRoute = publicRoutes.includes(currentPath);

  const { data, isError, isFetching } = useUserProfileQuery(token) as {
    data: User;
    isFetching: boolean;
    isError: boolean;
  };

  // check authentication on mount
  useEffect(() => {
    if (data) {
      setUser(data);
      setIsAuthenticated(true);
    } else if (isError) {
      logout();
    }
  }, [data, isError]);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    } else if (!savedToken && !isPublicRoute) {
      logout();
    }
  }, []);

  // For force-logout
  // useEffect(() => {
  //   const handleForceLogout = () => {
  //     logout();
  //     navigate("/sign-in");
  //   };
  //   window.addEventListener("force-logout", handleForceLogout);

  //   return () => {
  //     window.removeEventListener("force-logout", handleForceLogout);
  //   };
  // }, []);

  const login = async (data: any) => {
    localStorage.setItem("token", data.token);
    setToken(data.token);
  };

  const logout = async () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
    setToken(null);
    setIsLoading(false);
    queryClient.clear();
    navigate("/");
  };

  const values = {
    user,
    isAuthenticated,
    isLoading: isFetching,
    login,
    logout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
