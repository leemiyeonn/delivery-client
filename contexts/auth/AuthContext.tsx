import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import {
  login as apiLogin,
  logout as apiLogout,
  checkAuthStatus,
} from "../../lib/auth";

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
    const checkAuth = async () => {
      const status = await checkAuthStatus();
      setIsAuth(status);
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
      // 서버에 로그아웃 요청 보내기
      await apiLogout();

      // 인증 상태 업데이트
      setIsAuth(false);

      // 홈으로 리다이렉트
      // window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
      // 에러 처리 (사용자에게 알림 등)
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
