import { NextPage, GetServerSideProps } from "next";
import Link from "next/link";
import path from "path";
import fs from "fs";
import OrderSummary from "../../components/OrderSummary";
import { Order } from "../../types/Order";
import { Store } from "../../types/Store";

interface OrderDetailProps {
  order: Order;
  store: Store;
}

const OrderDetail: NextPage<OrderDetailProps> = ({ order, store }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header>
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Order Details</h1>
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
          <OrderSummary order={order} store={store} />
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<OrderDetailProps> = async (
  context
) => {
  const { id } = context.params as { id: string };

  // Load orders
  const ordersFilePath = path.join(
    process.cwd(),
    "public",
    "data",
    "orders.json"
  );
  const ordersFileContent = fs.readFileSync(ordersFilePath, "utf8");
  const orders: Order[] = JSON.parse(ordersFileContent);
  const order = orders.find((o) => o.id === id);

  if (!order) {
    console.error(`Order with id ${id} not found.`);
    return { notFound: true };
  }

  // Load stores
  const storesFilePath = path.join(
    process.cwd(),
    "public",
    "data",
    "stores.json"
  );
  const storesFileContent = fs.readFileSync(storesFilePath, "utf8");
  const stores: Store[] = JSON.parse(storesFileContent);
  const store = stores.find((s) => s.name === order.storeName); // Use store name to find the store

  if (!store) {
    console.error(`Store with name ${order.storeName} not found.`);
    return { notFound: true };
  }

  return { props: { order, store } };
};

export default OrderDetail;
