import { createContext, useContext, useState, ReactNode } from "react";
import { CartProduct } from "../../types/products/CartProduct";

interface CartContextType {
  items: CartProduct[];
  addToCart: (product: CartProduct) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  currentStoreId: string | null;
}

interface CartProviderProps {
  children: ReactNode;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartProduct[]>([]);
  const [currentStoreId, setCurrentStoreId] = useState<string | null>(null);

  const addToCart = (product: CartProduct) => {
    if (currentStoreId && product.storeId !== currentStoreId) {
      alert(
        "You can only add products from one store to the cart. Please empty your cart or finish your current order before adding products from a different store."
      );
      return;
    }

    if (!currentStoreId) {
      setCurrentStoreId(product.storeId);
    }

    const existingItem = items.find((item) => item.id === product.id);
    if (existingItem) {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        )
      );
    } else {
      setItems([...items, product]);
    }
  };

  const updateQuantity = (id: string, quantity: number) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    if (items.length === 1) {
      setCurrentStoreId(null);
    }
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        currentStoreId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};