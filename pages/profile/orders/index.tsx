import { NextPage, GetStaticProps } from "next";
import Link from "next/link";
import { Order } from "../../../types/orders/Order";
import styles from "../../../styles/order/Orders.module.css";

interface OrdersProps {
  orders: Order[];
}

const Orders: NextPage<OrdersProps> = ({ orders }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>🏷️ Your Orders</h1>
      <div className={styles.grid}>
        {orders.map((order) => (
          <Link href={`/orders/${order.orderId}`} key={order.orderId} passHref>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h2 className={styles.orderId}>Order #{order.orderId}</h2>
                <span
                  className={`${styles.statusBadge} ${
                    styles[`status${order.orderStatus}`] ||
                    styles.statusBadgeDefault
                  }`}
                >
                  {order.orderStatus}
                </span>
              </div>
              <div className={styles.orderDetails}>
                <div className={styles.orderDetail}>
                  <span className={styles.orderDetailLabel}>Store:</span>{" "}
                  {order.storeName}
                </div>
                <div className={styles.orderDetail}>
                  <span className={styles.orderDetailLabel}>Total:</span> $
                  {order.totalPrice}
                </div>
                <div className={styles.orderDetail}>
                  <span className={styles.orderDetailLabel}>Date:</span>{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Orders;
