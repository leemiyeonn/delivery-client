import React, { FC, useState } from "react";
import { Product } from "../types/Product";
import { CartProduct } from "../types/CartProduct";

interface ProductCardProps {
  product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return null;
  }

  const addToCart = (product: Product, quantity: number) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find(
      (cartProduct: CartProduct) => cartProduct.id === product.id
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">
      <div className="flex items-center w-full">
        <img
          src={product.image || "/default-image.png"}
          alt={product.name}
          className="w-16 h-16 object-cover rounded-md mr-4"
        />
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
          onClick={() => addToCart(product, quantity)}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
