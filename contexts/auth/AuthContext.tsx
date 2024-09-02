import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { login as apiLogin, logout as apiLogout } from "../../lib/auth";

const AUTHORIZATION_HEADER = "Authorization"; // 로컬 스토리지에 저장된 토큰의 키

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem(AUTHORIZATION_HEADER);
      if (token) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      await apiLogin(username, password);
      setIsAuth(true);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await apiLogout();
      localStorage.removeItem(AUTHORIZATION_HEADER); // 로그아웃 시 로컬 스토리지에서 토큰 삭제
      setIsAuth(false);
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
