import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import Link from "next/link";
import path from "path";
import fs from "fs";
import OrderSummary from "../../components/OrderSummary";
import { Order } from "../../types/Order";

interface OrderDetailProps {
  order: Order;
}

const OrderDetail: NextPage<OrderDetailProps> = ({ order }) => {
  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header>
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">🛒 Order Details</h1>
          <Link
            href="/orders"
            className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
          >
            Back to Orders
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <OrderSummary order={order} />
        </div>
      </main>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const ordersFilePath = path.join(
    process.cwd(),
    "public",
    "data",
    "orders.json"
  );
  const ordersFileContents = fs.readFileSync(ordersFilePath, "utf8");
  const orders: Order[] = JSON.parse(ordersFileContents);

  const paths = orders.map((order) => ({
    params: { id: order.id },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<OrderDetailProps> = async ({
  params,
}) => {
  const ordersFilePath = path.join(
    process.cwd(),
    "public",
    "data",
    "orders.json"
  );
  const ordersFileContents = fs.readFileSync(ordersFilePath, "utf8");
  const orders: Order[] = JSON.parse(ordersFileContents);

  const order = orders.find((o) => o.id === params?.id);

  if (!order) {
    return { notFound: true };
  }

  return { props: { order } };
};

export default OrderDetail;
