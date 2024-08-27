import { Product } from "./Product";

export interface Store {
  id: string;
  name: string;
  category: string;
  description: string;
  products: Product[];
}
