import React from "react";
import styles from "../styles/order/OrderSummary.module.css";
import { OrderSummary as OrderSummaryType } from "../types/OrderSummary";
import { OrderProduct } from "../types/OrderProduct";

type OrderSummaryProps = Omit<OrderSummaryType, "store"> & {
  store?: OrderSummaryType["store"];
};

const OrderSummary: React.FC<OrderSummaryProps> = ({ order, store }) => {
  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.orderHeader}>
          Order from {store ? store.name : order.storeName}
        </h2>
        <p className={styles.orderText}>Order ID: {order.id}</p>
        <p className={styles.orderText}>Store: {order.storeName}</p>
        <p className={styles.orderText}>Status: {order.status}</p>
        <p className={styles.orderText}>
          Order Date: {new Date(order.orderDate).toLocaleString()}
        </p>
      </div>

      <div className={styles.container}>
        <h3 className={styles.orderProductsHeader}>Order products</h3>
        <ul className={styles.productList}>
          {order.products.map((product: OrderProduct) => (
            <li key={product.id} className={styles.productItem}>
              <div>
                <p className={styles.productName}>{product.name}</p>
                <p className={styles.productQuantity}>
                  Quantity: {product.quantity}
                </p>
              </div>
              <p className={styles.productPrice}>
                ${(product.price * product.quantity).toFixed(2)}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.container}>
        <div className={styles.totalContainer}>
          <span>Total:</span>
          <span>${order.total.toFixed(2)}</span>
        </div>
      </div>
    </>
  );
};

export default OrderSummary;
