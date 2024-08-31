import { NextPage, GetStaticProps } from "next";
import { useState } from "react";
import { Order } from "../../../types/orders/Order";
import { getOrdersData } from "../../../lib/data/orderData";
import styles from "../../../styles/admin/AdminDetail.module.css";
import { Pagination } from "../../../components/layout/Pagenation";

interface OrdersProps {
  orders: Order[];
}

const Orders: NextPage<OrdersProps> = ({ orders }) => {
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(orders.length / ITEMS_PER_PAGE);

  const currentOrders = orders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>📦 Order Management</h1>
      <div className={styles.grid}>
        {currentOrders.map((order) => (
          <div className={styles.card} key={order.id}>
            <h2 className={styles.orderId}>Order #{order.id}</h2>
            <p className={styles.orderDetail}>Store: {order.storeName}</p>
            <p className={styles.orderDetail}>Total: ${order.total}</p>
            <p className={styles.orderDetail}>
              Date: {new Date(order.orderDate).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export const getStaticProps: GetStaticProps<OrdersProps> = async () => {
  const orders = getOrdersData();
  return { props: { orders } };
};

export default Orders;
