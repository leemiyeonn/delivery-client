import { BaseProduct } from "./BaseProduct";

export interface OrderProduct extends BaseProduct {
  quantity: number;
}
