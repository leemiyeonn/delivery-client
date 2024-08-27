import { NextPage, GetServerSideProps } from "next";
import path from "path";
import fs from "fs";
import Link from "next/link";
import { Order } from "../../types/Order";
import { Store } from "../../types/Store";

interface OrdersProps {
  orders: Order[];
}

const OrderStatusColor: { [key: string]: string } = {
  Pending: "bg-yellow-100 text-yellow-800",
  Processing: "bg-blue-100 text-blue-800",
  Shipped: "bg-green-100 text-green-800",
  Delivered: "bg-purple-100 text-purple-800",
  Cancelled: "bg-red-100 text-red-800",
};

const Orders: NextPage<OrdersProps> = ({ orders }) => {
  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-gray-800"> 🏷️ Your Orders</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {orders.map((order) => (
          <Link href={`/orders/${order.id}`} key={order.id}>
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Order #{order.id}
                  </h2>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      OrderStatusColor[order.status] ||
                      "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="text-gray-600">
                    <span className="font-medium text-gray-800">Store:</span>{" "}
                    {order.storeName}
                  </div>
                  <div className="text-gray-600">
                    <span className="font-medium text-gray-800">Total:</span> $
                    {order.total.toFixed(2)}
                  </div>
                  <div className="text-gray-600">
                    <span className="font-medium text-gray-800">Date:</span>{" "}
                    {new Date(order.orderDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<OrdersProps> = async () => {
  const ordersFilePath = path.join(
    process.cwd(),
    "public",
    "data",
    "orders.json"
  );
  const ordersFileContent = fs.readFileSync(ordersFilePath, "utf8");
  const orders: Order[] = JSON.parse(ordersFileContent);

  const storesFilePath = path.join(
    process.cwd(),
    "public",
    "data",
    "stores.json"
  );
  const storesFileContent = fs.readFileSync(storesFilePath, "utf8");
  const stores: Store[] = JSON.parse(storesFileContent);

  // Map stores by their name for quick lookup
  const storeMap = new Map(stores.map((store) => [store.name, store]));

  // Augment orders with store information
  const ordersWithStoreNames = orders.map((order) => {
    const store = storeMap.get(order.storeName);
    return {
      ...order,
      storeName: store ? store.name : "Unknown Store",
    };
  });

  return {
    props: { orders: ordersWithStoreNames },
  };
};

export default Orders;
