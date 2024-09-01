import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = "http://localhost:8080/api/v1";
const AUTHORIZATION_HEADER = "AUTHORIZATION_HEADER"; // 서버에서 기대하는 쿠키 이름

// Function to get the token from the cookie
const getToken = (): string | null => {
  const token = Cookies.get(AUTHORIZATION_HEADER);
  return token ? token : null; // 토큰을 그대로 반환
};

// Function to create an Axios instance
const createApiClient = (): AxiosInstance => {
  const apiClient = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // 요청에 쿠키를 포함시킴
  });

  // 요청 인터셉터 추가
  apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getToken();
      if (token && config.headers) {
        config.headers["Authorization"] = token; // 쿠키에서 가져온 토큰을 Authorization 헤더에 추가
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return apiClient;
};

export default createApiClient;
