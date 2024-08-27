// 임시 데이터
const mockstores = [
  { id: "1", name: "Pizza Place", cuisine: "Italian", rating: 4.5 },
  { id: "2", name: "Burger Joint", cuisine: "American", rating: 4.2 },
  { id: "3", name: "Sushi Bar", cuisine: "Japanese", rating: 4.7 },
];

const mockOrders: any[] = [];

export const fetchstores = async () => {
  // API 호출을 시뮬레이션
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockstores), 500);
  });
};

export const fetchstoreById = async (id: string) => {
  // API 호출을 시뮬레이션
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const store = mockstores.find((r) => r.id === id);
      if (store) {
        resolve(store);
      } else {
        reject(new Error("store not found"));
      }
    }, 500);
  });
};

export const placeOrder = async (orderData: any) => {
  // API 호출을 시뮬레이션
  return new Promise((resolve) => {
    setTimeout(() => {
      const newOrder = { ...orderData, id: Date.now().toString() };
      mockOrders.push(newOrder);
      resolve(newOrder);
    }, 500);
  });
};

export const fetchOrders = async (userId: string) => {
  // API 호출을 시뮬레이션
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockOrders), 500);
  });
};
