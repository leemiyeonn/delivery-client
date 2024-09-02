import axios from "axios";

const API_BASE_URL = "https://gunwoo.store/api/v1";
const AUTHORIZATION_HEADER = "Authorization";

// 로그인 함수
export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/signIn`,
      { username, password },
      { withCredentials: false }
    );

    // 응답 헤더에서 Authorization 읽기
    const token = response.headers[AUTHORIZATION_HEADER.toLowerCase()];
    if (token) {
      console.log("Token:", token);
      localStorage.setItem(AUTHORIZATION_HEADER, token); // 로컬 스토리지에 저장
      return token;
    } else {
      console.error("Token is not found in headers");
      return null;
    }
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// 로그아웃 함수
export const logout = async () => {
  try {
    // 서버에 로그아웃 요청 보내기
    const _ = await axios.post(
      `${API_BASE_URL}/auth/logout`,
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
