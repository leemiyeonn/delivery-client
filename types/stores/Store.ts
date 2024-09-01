import { Product } from "../products/Product";

export interface Store extends BaseModel {
  id: string;
  name: string;
  description: string;
  address: string;
  categoryName: [];
  products: Product[];
}
