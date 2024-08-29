import React from "react";
import Image from "next/image";
import { useCart } from "../../contexts/cart/CartContext";
import { CartProduct } from "../../types/products/CartProduct";

const Cart: React.FC = () => {
  const { items, updateQuantity, removeFromCart } = useCart();

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const defaultProductImage = "/images/defaultProductImage.JPG";

  const getImageSrc = (product: CartProduct) => {
    return product.image && product.image.trim() !== ""
      ? product.image
      : defaultProductImage;
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {items.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="item-image">
                <Image
                  src={getImageSrc(item)}
                  alt={item.name}
                  width={100}
                  height={100}
                  objectFit="cover"
                />
              </div>
              <div className="item-details">
                <h3>{item.name}</h3>
                <p>Price: ${item.price.toFixed(2)}</p>
                <div className="quantity-controls">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <h3>Total: ${totalPrice.toFixed(2)}</h3>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
