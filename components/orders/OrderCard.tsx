import { FC } from "react";
import { Order } from "../../types/orders/Order";

interface OrderCardProps {
  order: Order;
}

const OrderCard: FC<OrderCardProps> = ({ order }) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <h2 className="text-xl font-bold mb-2">Order ID: {order.id}</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-gray-600">Store: {order.storeName}</p>
          <p className="text-gray-600">Total: ${order.total.toFixed(2)}</p>
          <p className="text-gray-600">Status: {order.status}</p>
        </div>
        <div>
          <p className="text-gray-600">
            Order Date: {new Date(order.orderDate).toLocaleDateString()}
          </p>
        </div>
      </div>
      <h3 className="text-lg font-semibold mb-2">Order Items:</h3>
      <ul className="space-y-2">
        {order.products.map((product) => (
          <li key={product.id} className="flex justify-between items-center">
            <span>{product.name}</span>
            <span>
              {product.quantity} x ${product.price.toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderCard;
