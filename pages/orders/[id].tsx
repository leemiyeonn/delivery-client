import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import OrderSummary from "../../components/orders/OrderSummary";
import { Order } from "../../types/orders/Order";
import { getOrdersData, getOrderData } from "../../lib/data/orderData";
import styles from "../../styles/order/OrderDetail.module.css";

interface OrderDetailProps {
  order: Order;
}

const OrderDetail: NextPage<OrderDetailProps> = ({ order }) => {
  const router = useRouter();

  if (!order) {
    return <div>Order not found</div>;
  }

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.heading}> 🏷️ Order Details </h1>
        <button onClick={handleBackClick} className={styles.backButton}>
          Back to Orders
        </button>
      </div>
      <div className={styles.card}>
        <OrderSummary order={order} />
      </div>
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
