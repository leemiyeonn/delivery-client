import { NextPage, GetServerSideProps } from "next";
import { useState } from "react";
import { Store } from "../../types/Store";
import { Product } from "../../types/Product";
import fs from "fs";
import path from "path";
import { useCart } from "../../contexts/CartContext";
import Link from "next/link";
import Image from "next/image";

interface StoreDetailProps {
  store: Store | null;
  products: Product[];
}

const StoreDetail: NextPage<StoreDetailProps> = ({ store, products }) => {
  const { items, addToCart, currentStoreId } = useCart();
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
      const cartProduct = {
        ...product,
        quantity,
        storeId: store.id,
      };
      addToCart(cartProduct);
      setQuantities((prev) => ({ ...prev, [product.id]: 0 }));
    }
  };

  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const isCurrentStore = currentStoreId === null || currentStoreId === store.id;

  const defaultProductImage = "/images/default/default-product-image.png"; // 기본 이미지 경로

  const getImageSrc = (product: Product) => {
    return product.image && product.image.trim() !== ""
      ? product.image
      : defaultProductImage;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">🍽️ {store.name}</h1>
      <p className="text-gray-600 mb-6">{store.description}</p>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">🛍️ Menu</h2>
        <Link
          href="/cart"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Cart ({cartItemsCount})
        </Link>
      </div>

      {!isCurrentStore && (
        <div
          className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6"
          role="alert"
        >
          <p className="font-bold">⚠️ Warning ⚠️</p>
          <p>
            You have items in your cart from another store. Please empty your
            cart or complete your current order before adding items from this
            store.
          </p>
        </div>
      )}

      {products.length > 0 ? (
        <div className="space-y-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-center space-x-4 p-6 bg-white rounded-lg shadow"
            >
              <Image
                src={getImageSrc(product)}
                alt={product.name}
                width={128}
                height={128}
                className="w-32 h-32 object-cover rounded"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = defaultProductImage;
                }}
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
                  disabled={!isCurrentStore}
                >
                  -
                </button>
                <span className="text-lg font-medium w-10 text-center">
                  {quantities[product.id] || 0}
                </span>
                <button
                  className="px-4 py-2 bg-gray-200 rounded text-lg"
                  onClick={() => handleQuantityChange(product.id, 1)}
                  disabled={!isCurrentStore}
                >
                  +
                </button>
              </div>
              <button
                className="px-4 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 text-lg disabled:bg-gray-400"
                onClick={() => handleAddToCart(product)}
                disabled={!isCurrentStore}
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
    const parsedData = JSON.parse(fileContent);

    let store = null;
    let products: Product[] = [];

    // Iterate over each data object in the array
    for (const data of parsedData) {
      store = data.stores.find((s: Store) => s.id === id);
      if (store) {
        products = data.products.filter((p: Product) => p.storeId === id);
        break; // Exit loop once the store is found
      }
    }

    if (!store) {
      return { props: { store: null, products: [] } };
    }

    return { props: { store, products } };
  } catch (error) {
    console.error("Error fetching store data:", error);
    return { props: { store: null, products: [] } };
  }
};

export default StoreDetail;
