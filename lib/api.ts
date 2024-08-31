import axios, { AxiosInstance } from "axios";

const API_BASE_URL = "http://localhost:8080/api/v1";

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // 쿠키를 포함한 요청을 보내도록 설정
});

export const fetchStores = async () => {
  try {
    const response = await apiClient.get("/stores");
    return response.data;
  } catch (error) {
    console.error("Error fetching stores:", error);
    throw error;
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
