import createApiClient from "./appClient";
import Cookies from "js-cookie";

const apiClient = createApiClient();

const AUTHORIZATION_HEADER = "AUTHORIZATION_HEADER"; // 서버에서 기대하는 쿠키 이름

export const login = async (username: string, password: string) => {
  try {
    const response = await apiClient.post("/auth/signIn", {
      username,
      password,
    });

    if (!response.data || !response.data.token) {
      console.error("Token not received from the server");
      return null; // 토큰이 없을 경우 null 반환
    }

    const { token } = response.data;

    if (token) {
      // 서버가 기대하는 대로 JWT 토큰을 'Bearer ' 접두사와 함께 쿠키에 저장
      Cookies.set(AUTHORIZATION_HEADER, `Bearer ${token}`, { expires: 7 });
      console.log(`Bearer ${token}`);
      localStorage.setItem("Authorization", token); // 로컬 스토리지에도 저장 (필요한 경우)
      return token;
    } else {
      console.error("Token is undefined");
      return null; // 토큰이 undefined일 경우 null 반환
    }
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await apiClient.post("/auth/logout");
    Cookies.remove(AUTHORIZATION_HEADER);
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

export const checkAuthStatus = async () => {
  try {
    const response = await apiClient.get("/auth/status");
    return response.data.isAuthenticated;
  } catch (error) {
    console.error("Auth status check error:", error);
    return false;
  }
};
