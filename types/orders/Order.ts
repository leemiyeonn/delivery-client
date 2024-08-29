import { OrderProduct } from "../products/OrderProduct";
import { OrderStatus } from "./OrderStatus";

export interface Order extends BaseModel {
  id: string;
  storeName: string;
  products: OrderProduct[];
  total: number;
  status: OrderStatus;
  orderDate: string;
}
