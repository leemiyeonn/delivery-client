import path from "path";
import fs from "fs";
import { Order } from "../../types/orders/Order";

export async function getOrderData(orderId: string): Promise<Order | null> {
  try {
    const response = await fetch(
      `https://gunwoo.store/api/v1/orders/${orderId}`
    );
    const data = await response.json();

    if (data.success && data.data) {
      return data.data;
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch order data:", error);
    return null;
  }
}
