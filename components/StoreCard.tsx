import React from "react";
import Link from "next/link";
import { Store } from "../types/Store";
import { Product } from "../types/Product";

interface StoreCardProps {
  store: Store;
  products: Product[];
}

const StoreCard: React.FC<StoreCardProps> = ({ store, products }) => {
  const priceRange =
    products.length > 0
      ? `$${Math.min(...products.map((p) => p.price)).toFixed(2)} - $${Math.max(
          ...products.map((p) => p.price)
        ).toFixed(2)}`
      : "N/A";

  return (
    <Link href={`/stores/${store.id}`}>
      <div className="bg-white shadow-md rounded-lg overflow-hidden w-full h-full hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between">
        <div className="p-4 flex-grow">
          <h3 className="text-lg font-semibold mb-2 truncate">{store.name}</h3>
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">
            {store.description}
          </p>
        </div>
        <div className="p-4">
          <p className="text-xs text-gray-500 truncate">
            {store.category} • {products.length} products
          </p>
          <p className="text-xs text-gray-500 truncate">
            Price range: {priceRange}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default StoreCard;
