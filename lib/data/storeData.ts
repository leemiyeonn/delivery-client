import path from "path";
import fs from "fs";
import { Store } from "../../types/stores/Store";
import { Product } from "../../types/products/Product";

const storesFilePath = path.join(
  process.cwd(),
  "public",
  "data",
  "stores.json"
);

export const getStoreData = (id: string): Store | undefined => {
  const { stores } = getStoresData();
  return stores.find((store) => store.id === id);
};

export const getStoresData = (): { stores: Store[]; products: Product[] } => {
  const storesFileContents = fs.readFileSync(storesFilePath, "utf8");
  const parsedData = JSON.parse(storesFileContents);

  const stores: Store[] = parsedData.flatMap(
    (category: any) => category.stores || []
  );
  const products: Product[] = parsedData.flatMap(
    (category: any) => category.products || []
  );

  return { stores, products };
};

export const getStoreAndProducts = (
  id: string
): { store: Store | null; products: Product[] } => {
  const fileContent = fs.readFileSync(storesFilePath, "utf8");
  const parsedData = JSON.parse(fileContent);

  let store: Store | null = null;
  let products: Product[] = [];

  for (const data of parsedData) {
    store = data.stores.find((s: Store) => s.id === id);
    if (store) {
      products = data.products.filter((p: Product) => p.storeId === id);
      break;
    }
  }

  return { store, products };
};
