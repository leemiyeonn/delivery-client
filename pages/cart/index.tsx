import { NextPage } from "next";
import { useRouter } from "next/router";
import { useCart } from "../../contexts/cart/CartContext";
import CartProduct from "../../components/products/CartProduct";
import EmptyCart from "../../components/carts/EmptyCart";
import styles from "../../styles/cart/Cart.module.css";

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
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>🛒 Your Cart</h1>
        <button
          onClick={handleContinueShopping}
          className={styles.continueShoppingButton}
        >
          Continue Shopping
        </button>
      </header>

      <main>
        {items.length === 0 && <EmptyCart />}
        {items.length > 0 && (
          <div className="space-y-4">
            {items.map((item) => (
              <CartProduct
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
                className={styles.checkoutButton}
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