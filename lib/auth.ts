import axios, { AxiosInstance } from "axios";

const API_BASE_URL = "http://localhost:8080/api/v1";

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // 쿠키를 포함한 요청을 보내도록 설정
});

export const login = async (username: string, password: string) => {
  try {
    const response = await apiClient.post("/auth/signIn", {
      username,
      password,
    });
    // 로그인 성공 시 서버에서 자동으로 쿠키를 설정합니다.
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    // 서버에 로그아웃 요청을 보냅니다.
    await apiClient.post("/auth/logout");
    // 서버에서 쿠키를 삭제하므로 클라이언트에서 추가 작업이 필요 없습니다.
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

// 현재 인증 상태를 확인하는 함수
// HttpOnly 쿠키이므로 JavaScript에서 직접 확인할 수 없습니다.
// 대신 서버에 인증 상태를 확인하는 요청을 보냅니다.
export const checkAuthStatus = async () => {
  try {
    const response = await apiClient.get("/auth/status");
    return response.data.isAuthenticated;
  } catch (error) {
    console.error("Auth status check error:", error);
    return false;
  }
};
