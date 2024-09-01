import { NextPage, GetStaticProps } from "next";
import Link from "next/link";
import { Order } from "../../types/orders/Order";
import { getOrdersData } from "../../lib/data/orderData";
import styles from "../../styles/profile/Profile.module.css";
import orderStyles from "../../styles/order/Orders.module.css";

interface ProfileProps {
  orders: Order[];
}

const Profile: NextPage<ProfileProps> = ({ orders }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>👤 Profile </h1>
      <h2 className={styles.subheading}>🏷️ Your Orders</h2>
      <div className={orderStyles.grid}>
        {orders.map((order) => (
          <Link href={`/profile/orders/${order.id}`} key={order.id} passHref>
            <div className={orderStyles.card}>
              <div className={orderStyles.cardHeader}>
                <h2 className={orderStyles.orderId}>Order #{order.id}</h2>
                <span
                  className={`${orderStyles.statusBadge} ${
                    orderStyles[`status${order.status}`] ||
                    orderStyles.statusBadgeDefault
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <div className={orderStyles.orderDetails}>
                <div className={orderStyles.orderDetail}>
                  <span className={orderStyles.orderDetailLabel}>Store:</span>{" "}
                  {order.storeName}
                </div>
                <div className={orderStyles.orderDetail}>
                  <span className={orderStyles.orderDetailLabel}>Total:</span>{" "}
                  {order.total.toLocaleString("ko-KR")}원
                </div>
                <div className={orderStyles.orderDetail}>
                  <span className={orderStyles.orderDetailLabel}>Date:</span>{" "}
                  {new Date(order.orderDate).toLocaleDateString()}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps<ProfileProps> = async () => {
  const orders = getOrdersData();
  return { props: { orders } };
};

export default Profile;
