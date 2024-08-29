import React from "react";
import styles from "../../styles/cart/Cart.module.css";

const EmptyCart: React.FC = () => (
  <div className={styles.emptyCart}>
    <p className={styles.emptyCartText}>Your cart is empty.</p>
  </div>
);

export default EmptyCart;
