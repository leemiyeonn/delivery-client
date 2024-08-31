import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

const API_BASE_URL = "http://localhost:8080/api/v1";

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

export const fetchStores = async () => {
  const response = await apiClient.get("/stores");
  return response.data;
};

export const fetchStoreById = async (id: string) => {
  const response = await apiClient.get(`/stores/${id}`);
  return response.data;
};

export const placeOrder = async (orderData: any) => {
  const response = await apiClient.post("/orders", orderData);
  return response.data;
};
