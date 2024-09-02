import { NextPage, GetServerSideProps } from "next";
import { useRouter } from "next/router";
import OrderSummary from "../../../components/orders/OrderSummary";
import { Order } from "../../../types/orders/Order";
import { getOrderData } from "../../../lib/data/orderData";
import styles from "../../../styles/order/OrderDetail.module.css";

interface OrderDetailProps {
  order: Order;
}

const OrderDetail: NextPage<OrderDetailProps> = ({ order }) => {
  const router = useRouter();

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.heading}> 🏷️ Order Details </h1>
      </div>
      <div className={styles.card}>
        <OrderSummary order={order} />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<OrderDetailProps> = async ({
  params,
}) => {
  const orderId = params?.id as string;
  const order = await getOrderData(orderId);

  if (!order) {
    return { notFound: true };
  }

  return { props: { order } };
};

export default OrderDetail;
