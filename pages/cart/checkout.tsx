import { useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useCart } from "../../contexts/cart/CartContext";
import axios from "axios";
import styles from "../../styles/cart/Checkout.module.css";

const API_URL = "http://localhost:8080/api/v1";

const Checkout: NextPage = () => {
  const { items, clearCart } = useCart();
  const router = useRouter();
  const [address, setAddress] = useState("");
  const [orderRequest, setOrderRequest] = useState("");

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSubmitOrder = async () => {
    if (items.length === 0) return;

    const storeId = items[0].storeId; // Assuming all items are from the same store

    const orderData = {
      totalPrice,
      storeId,
      orderAddress: address,
      orderRequest,
      orderCategory: "DELIVERY",
      products: [],
    };

    try {
      // Step 1: Create the order
      const orderResponse = await axios.post(`${API_URL}/orders`, orderData);
      const orderId = orderResponse.data.id; // Assuming the API returns the created order ID

      // Step 2: Add products to the order
      for (const item of items) {
        await axios.post(`${API_URL}/orders/${orderId}/products/${item.id}`, {
          quantity: item.quantity,
        });
      }

      clearCart(); // Clear the cart after successful order
      router.push("/profile/orders"); // Redirect to order history
    } catch (error) {
      console.error("Error submitting order:", error);
      // Handle error, possibly show an error message to the user
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>🛒 Checkout</h1>
        <button onClick={() => router.back()} className={styles.backButton}>
          Back
        </button>
      </div>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>🚚 Delivery Address</h2>
        <input
          type="text"
          className={styles.input}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your delivery address"
        />
      </div>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>🏷️ Special Requests</h2>
        <textarea
          className={styles.textarea}
          value={orderRequest}
          onChange={(e) => setOrderRequest(e.target.value)}
          placeholder="Any special requests?"
        />
      </div>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>📦 Order Summary</h2>
        {items.map((item) => (
          <div key={item.id} className={styles.orderItem}>
            <div className={styles.itemInfo}>
              <span className={styles.itemName}>{item.name}</span>
              <span className={styles.itemQuantity}>
                Quantity: {item.quantity}
              </span>
            </div>
            <span className={styles.itemPrice}>
              {item.price.toLocaleString("ko-KR")}원
            </span>
          </div>
        ))}
        <div className={styles.totalPrice}>
          <span>Total:</span>
          <span>{totalPrice.toLocaleString("ko-KR")}원</span>
        </div>
      </div>

      <button
        className={styles.submitButton}
        onClick={handleSubmitOrder}
        disabled={!address}
      >
        Submit Order
      </button>
    </div>
  );
};

export default Checkout;
