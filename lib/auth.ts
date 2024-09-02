import createApiClient from "./appClient";
import axios from "axios";

const apiClient = createApiClient();

const AUTHORIZATION_HEADER = "Authorization";

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/v1/auth/signIn",
      { username, password },
      { withCredentials: true }
    );

    // 응답 헤더에서 Authorization 읽기
    const token = response.headers["authorization"];
    if (token) {
      console.log("Token:", token);
      localStorage.setItem("Authorization", token); // 로컬 스토리지에 저장
      return token;
    } else {
      console.error("Token is not found in headers");
      return null; // 토큰이 없을 경우 null 반환
    }
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    // 서버에 로그아웃 요청 보내기
    const _ = await axios.post(
      "http://localhost:8080/api/v1/auth/logout",
      {},
      { withCredentials: true }
    );

    // 로컬 스토리지에서 토큰 삭제
    localStorage.removeItem(AUTHORIZATION_HEADER);

    // 홈으로 리다이렉트
    window.location.href = "/";
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
