import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import Link from "next/link";
import OrderSummary from "../../components/OrderSummary";
import { Order } from "../../types/Order";
import { getOrdersData, getOrderData } from "../../lib/order";
import styles from "../../styles/order/OrderDetail.module.css";

interface OrderDetailProps {
  order: Order;
}

const OrderDetail: NextPage<OrderDetailProps> = ({ order }) => {
  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <div className="min-h-screen">
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>🛒 Order Details</h1>
        <Link href="/orders" className={styles.backButton}>
          Back to Orders
        </Link>
      </header>

      <main className={styles.main}>
        <OrderSummary order={order} />
      </main>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const orders = getOrdersData();
  const paths = orders.map((order) => ({
    params: { id: order.id.toString() },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<OrderDetailProps> = async ({
  params,
}) => {
  const order = getOrderData(params?.id as string);
  if (!order) {
    return { notFound: true };
  }
  return { props: { order } };
};

export default OrderDetail;
