import { Product } from "../products/Product";

export interface Store extends BaseModel {
  id: string;
  name: string;
  category: string;
  description: string;
  products: Product[];
}
