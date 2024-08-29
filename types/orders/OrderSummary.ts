import { Order } from "./Order";
import { Store } from "./Store";

export interface OrderSummary {
  order: Order;
  store: Store;
}
