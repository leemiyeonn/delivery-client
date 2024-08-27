import { OrderProduct } from "./OrderProduct";
import { OrderStatus } from "./OrderStatus";

export interface Order {
  id: string;
  storeName: string;
  products: OrderProduct[];
  total: number;
  status: OrderStatus;
  orderDate: string;
}
