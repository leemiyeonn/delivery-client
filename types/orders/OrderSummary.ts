import { Order } from "./Order";
import { Store } from "../stores/Store";

export interface OrderSummary {
  order: Order;
  store: Store;
}
