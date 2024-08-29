import { BaseProduct } from "./BaseProduct";

export interface Product extends BaseProduct {
  description: string;
  image?: string;
}
