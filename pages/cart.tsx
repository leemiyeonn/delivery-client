import { NextPage } from "next";
import Image from "next/image";
import { useCart } from "../contexts/CartContext";
import { CartProduct } from "../types/CartProduct";
import { useRouter } from "next/router";
import styles from "../styles/cart/cart.module.css";

const EmptyCart: React.FC = () => (
  <div className={styles.emptyCart}>
    <p className={styles.emptyCartText}>Your cart is empty.</p>
  </div>
);

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

const Cart: NextPage = () => {
  const { items, updateQuantity, removeFromCart } = useCart();
  const router = useRouter();

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    router.push("/orders");
  };

  const handleContinueShopping = () => {
    router.back();
  };

  return (
    <div className="min-h-screen">
      <header>
        <div className={styles.headerContainer}>
          <h1 className={styles.headerTitle}>🛒 Your Cart</h1>
          <button
            onClick={handleContinueShopping}
            className={styles.continueShoppingButton}
          >
            Continue Shopping
          </button>
        </div>
      </header>

      <main className={styles.mainContainer}>
        {items.length === 0 && <EmptyCart />}
        {items.length > 0 && (
          <div className="space-y-4">
            {items.map((item) => (
              <CartProductComponent
                key={item.id}
                product={item}
                onQuantityChange={updateQuantity}
                onRemove={removeFromCart}
              />
            ))}
            <div className={styles.totalContainer}>
              <div className={styles.totalRow}>
                <span className={styles.totalText}>Total:</span>
                <span className={styles.totalPrice}>
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <button
                onClick={handleCheckout}
                className={`${styles.checkoutButton} mt-6`}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;
