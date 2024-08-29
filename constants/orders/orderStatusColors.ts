import { OrderStatus } from "../../types/orders/OrderStatus";

export const ORDER_STATUS_COLORS: {
  [key in OrderStatus]: { backgroundColor: string; color: string };
} = {
  [OrderStatus.PENDING]: { backgroundColor: "#fef3c7", color: "#92400e" },
  [OrderStatus.PROCESSING]: { backgroundColor: "#dbeafe", color: "#1e40af" },
  [OrderStatus.COMPLETED]: { backgroundColor: "#d1fae5", color: "#065f46" },
  [OrderStatus.CANCELLED]: { backgroundColor: "#fee2e2", color: "#991b1b" },
};
