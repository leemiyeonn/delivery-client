import path from "path";
import fs from "fs";
import { Order } from "../../types/orders/Order";

const ordersFilePath = path.join(
  process.cwd(),
  "public",
  "data",
  "orders.json"
);

export const getOrdersData = (): Order[] => {
  const ordersFileContents = fs.readFileSync(ordersFilePath, "utf8");
  return JSON.parse(ordersFileContents);
};

export const getOrderData = (id: string): Order | undefined => {
  const orders = getOrdersData();
  return orders.find((order) => order.id === id);
};
