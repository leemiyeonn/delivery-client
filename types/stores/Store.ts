import { Product } from "../products/Product";

export interface Store extends BaseModel {
  id: string;
  name: string;
  categoryName: string;
  description: string;
  products: Product[];
}
