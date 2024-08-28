import React, { FC, useState } from "react";
import Image from "next/image";
import { Product } from "../types/Product";
import { useCart } from "../contexts/CartContext";

interface ProductCardProps {
  product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  if (!product) {
    return null;
  }

  const defaultProductImage = "/images/default-product-image.jpg";

  const getImageSrc = (product: Product) => {
    return product.image && product.image.trim() !== ""
      ? product.image
      : defaultProductImage;
  };

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    setQuantity(1); // Reset quantity after adding to cart
  };

  return (
    <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">
      <div className="flex items-center w-full">
        <div className="w-16 h-16 mr-4 relative">
          <Image
            src={getImageSrc(product)}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = defaultProductImage;
            }}
          />
        </div>
        <div className="flex-1">
          <h5 className="text-lg font-semibold">{product.name}</h5>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-lg font-bold mt-1">${product.price.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center mt-4">
        <div className="flex items-center">
          <button
            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            className="px-2 py-1 bg-gray-200 rounded-l"
          >
            -
          </button>
          <span className="px-4 py-1 bg-gray-100">{quantity}</span>
          <button
            onClick={() => setQuantity((prev) => prev + 1)}
            className="px-2 py-1 bg-gray-200 rounded-r"
          >
            +
          </button>
        </div>
        <button
          onClick={handleAddToCart}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
