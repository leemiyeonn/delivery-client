import { NextPage, GetServerSideProps } from "next";
import { useState } from "react";
import { Store } from "../../types/Store";
import { Product } from "../../types/Product";
import fs from "fs";
import path from "path";
import { useCart } from "../../contexts/CartContext";
import Link from "next/link";

interface StoreDetailProps {
  store: Store | null;
}

const StoreDetail: NextPage<StoreDetailProps> = ({ store }) => {
  const { items, addToCart } = useCart();
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  if (!store) {
    return <div className="container mx-auto px-4 py-8">Store not found</div>;
  }

  const handleQuantityChange = (productId: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 0) + delta),
    }));
  };

  const handleAddToCart = (product: Product) => {
    const quantity = quantities[product.id] || 0;
    if (quantity > 0) {
      addToCart(product, quantity);
      setQuantities((prev) => ({ ...prev, [product.id]: 0 }));
    }
  };

  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">🍽️ {store.name}</h1>
      <p className="text-gray-600 mb-6">{store.description}</p>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">🛍️ menu</h2>
        <Link
          href="/cart"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Cart ({cartItemsCount})
        </Link>
      </div>

      {store.products && store.products.length > 0 ? (
        <div className="space-y-6">
          {store.products.map((product) => (
            <div
              key={product.id}
              className="flex items-center space-x-4 p-6 bg-white rounded-lg shadow"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-32 h-32 object-cover rounded"
              />
              <div className="flex-grow">
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-gray-600 mt-2">{product.description}</p>
                <p className="text-xl font-bold mt-2">
                  ${product.price.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  className="px-4 py-2 bg-gray-200 rounded text-lg"
                  onClick={() => handleQuantityChange(product.id, -1)}
                >
                  -
                </button>
                <span className="text-lg font-medium w-10 text-center">
                  {quantities[product.id] || 0}
                </span>
                <button
                  className="px-4 py-2 bg-gray-200 rounded text-lg"
                  onClick={() => handleQuantityChange(product.id, 1)}
                >
                  +
                </button>
              </div>
              <button
                className="px-4 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 text-lg"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No products available for this store.</p>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { id } = context.params as { id: string };
    const filePath = path.join(process.cwd(), "public", "data", "stores.json");
    const fileContent = fs.readFileSync(filePath, "utf8");
    const stores: Store[] = JSON.parse(fileContent);

    const store = stores.find((s) => s.id === id);

    if (!store) {
      return { props: { store: null } };
    }

    return { props: { store } };
  } catch (error) {
    console.error("Error fetching store data:", error);
    return { props: { store: null } };
  }
};

export default StoreDetail;
