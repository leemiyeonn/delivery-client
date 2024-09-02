import React from "react";
import styles from "../../styles/order/OrderSummary.module.css";
import { OrderSummary as OrderSummaryType } from "../../types/orders/OrderSummary";
import { OrderProduct } from "../../types/products/OrderProduct";

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
        <p className={styles.orderText}>Address: {order.orderAddress}</p>
        <p className={styles.orderText}>Request: {order.orderRequest}</p>
        <p className={styles.orderText}>Status: {order.orderStatus}</p>
        <p className={styles.orderText}>
          Order Date: {new Date(order.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className={styles.container}>
        <h3 className={styles.orderProductsHeader}>Order products</h3>
        <ul className={styles.productList}>
          {order.orderProducts.map((product: OrderProduct) => (
            <li key={product.productId} className={styles.productItem}>
              <div>
                <p className={styles.productName}>{product.productName}</p>
                <p className={styles.productQuantity}>
                  quantity: {product.quantity}
                </p>
              </div>
              <p className={styles.productPrice}>
                {product.price * product.quantity} 원
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.container}>
        <div className={styles.totalContainer}>
          <span>Total:</span>
          <span>{order.totalPrice} 원 </span>
        </div>
      </div>
    </>
  );
};

export default OrderSummary;
