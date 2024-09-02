import { OrderProduct } from "../products/OrderProduct";
import { OrderStatus } from "./OrderStatus";

export interface Order {
  orderId: string;
  storeId: string;
  storeName: string;
  userId: number;
  orderAddress: string;
  orderRequest: string;
  orderStatus: OrderStatus;
  paymentStatus: string;
  orderCategory: string;
  totalPrice: number;
  orderProducts: OrderProduct[];
  createdAt: string;
}
