import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

const API_BASE_URL = "http://localhost:8080/api/v1";

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // 쿠키를 포함한 요청을 보내도록 설정
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // 토큰이 유효하지 않거나 만료된 경우 처리
      console.error("Unauthorized, logging out...");
      localStorage.removeItem("authToken");
      // 필요 시 로그인 화면으로 리디렉션
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const fetchStores = async () => {
  try {
    const response = await apiClient.get("/stores");
    return response.data;
  } catch (error) {
    console.error("Error fetching stores:", error);
    throw error; // 필요에 따라 사용자에게 에러를 보여주기 위해 재던질 수 있음
  }
};

export const fetchStoreById = async (id: string) => {
  try {
    const response = await apiClient.get(`/stores/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching store with id ${id}:`, error);
    throw error;
  }
};

export const placeOrder = async (orderData: any) => {
  try {
    const response = await apiClient.post("/orders", orderData);
    return response.data;
  } catch (error) {
    console.error("Error placing order:", error);
    throw error;
  }
};
