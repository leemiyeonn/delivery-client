import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

const API_BASE_URL = "https://gunwoo.store/api/v1";
const AUTHORIZATION_HEADER = "Authorization";

const createApiClient = (): AxiosInstance => {
  const apiClient = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: false, // 쿠키를 사용하지 않도록 설정
  });

  // 요청 인터셉터 추가
  apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem(AUTHORIZATION_HEADER); // 로컬 스토리지에서 토큰을 가져옴
      if (token && config.headers) {
        config.headers[AUTHORIZATION_HEADER] = `Bearer ${token}`; // 헤더에 토큰 설정, 'Bearer' 추가
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
