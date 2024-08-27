import React from "react";
import { OrderSummary as OrderSummaryType } from "../types/OrderSummary";
import { OrderProduct } from "../types/OrderProduct";

type OrderSummaryProps = OrderSummaryType;

const OrderSummary: React.FC<OrderSummaryProps> = ({ order, store }) => {
  return (
    <>
      <div className="p-6 mb-6 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-2xl font-bold mb-4">Order from {store.name}</h2>
        <p className="text-gray-700 mb-2">Order ID: {order.id}</p>
        <p className="text-gray-700 mb-2">Store: {order.storeName}</p>
        <p className="text-gray-700 mb-2">Status: {order.status}</p>
        <p className="text-gray-700 mb-2">Order Date: {order.orderDate}</p>
      </div>

      <div className="p-6 mb-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-xl font-bold mb-4">Order products</h3>
        <ul className="divide-y divide-gray-200">
          {order.products.map((product: OrderProduct) => (
            <li
              key={product.id}
              className="py-4 flex justify-between items-center"
            >
              <div>
                <p className="text-lg font-semibold">{product.name}</p>
                <p className="text-gray-600">Quantity: {product.quantity}</p>
              </div>
              <p className="text-lg font-bold">
                ${(product.price * product.quantity).toFixed(2)}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-6 rounded-lg shadow-md border border-gray-200">
        <div className="flex justify-between items-center text-xl font-bold">
          <span>Total:</span>
          <span>${order.total.toFixed(2)}</span>
        </div>
      </div>
    </>
  );
};

export default OrderSummary;
