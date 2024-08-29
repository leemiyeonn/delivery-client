import React from "react";
import Image from "next/image";
import { CartProduct } from "../../types/products/CartProduct";
import styles from "../../styles/cart/Cart.module.css";

interface CartProductProps {
  product: CartProduct;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

const CartProductComponent: React.FC<CartProductProps> = ({
  product,
  onQuantityChange,
  onRemove,
}) => {
  const defaultProductImage = "/images/default/default-product-image.png";

  const getImageSrc = (product: CartProduct) => {
    return product.image && product.image.trim() !== ""
      ? product.image
      : defaultProductImage;
  };

  return (
    <div className={styles.cartProductContainer}>
      <div className="flex items-center">
        <div className={styles.productImageContainer}>
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
        <div className={styles.productInfo}>
          <h3 className={styles.productName}>{product.name}</h3>
          <p className={styles.productDescription}>{product.description}</p>
          <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
        </div>
        <div className={styles.productControls}>
          <button
            onClick={() => onQuantityChange(product.id, product.quantity - 1)}
            className={styles.quantityButton}
            disabled={product.quantity <= 1}
          >
            -
          </button>
          <input
            type="number"
            min="1"
            value={product.quantity}
            onChange={(e) =>
              onQuantityChange(product.id, parseInt(e.target.value, 10))
            }
            className={styles.quantityInput}
          />
          <button
            onClick={() => onQuantityChange(product.id, product.quantity + 1)}
            className={styles.quantityButton}
          >
            +
          </button>
          <button
            onClick={() => onRemove(product.id)}
            className={styles.removeButton}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartProductComponent;
