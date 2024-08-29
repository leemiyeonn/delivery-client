import { NextPage, GetServerSideProps } from "next";
import { useState } from "react";
import { Store } from "../../types/stores/Store";
import { Product } from "../../types/products/Product";
import { useCart } from "../../contexts/cart/CartContext";
import { getStoreAndProducts } from "../../lib/data/storeData";
import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/store/StoreDetail.module.css";

interface StoreDetailProps {
  store: Store | null;
  products: Product[];
}

const StoreDetail: NextPage<StoreDetailProps> = ({ store, products }) => {
  const { items, addToCart, currentStoreId } = useCart();
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  if (!store) {
    return <div className={styles.container}>Store not found</div>;
  }

  const handleQuantityChange = (productId: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 0) + delta),
    }));
  };

  const handleAddToCart = (product: Product) => {
    const quantity = quantities[product.id] || 0;
    if (quantity > 0) {
      const cartProduct = {
        ...product,
        quantity,
        storeId: store.id,
      };
      addToCart(cartProduct);
      setQuantities((prev) => ({ ...prev, [product.id]: 0 }));
    }
  };

  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const isCurrentStore = currentStoreId === null || currentStoreId === store.id;

  const defaultProductImage = "/images/default/default-product-image.png";

  const getImageSrc = (product: Product) => {
    return product.image && product.image.trim() !== ""
      ? product.image
      : defaultProductImage;
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.storeHeader}>🍽️ {store.name}</h1>
      <p className={styles.storeDescription}>{store.description}</p>

      <div className={styles.menuSection}>
        <h2 className={styles.menuHeader}>🛍️ Menu</h2>
        <Link href="/cart" className={styles.cartButton}>
          Cart ({cartItemsCount})
        </Link>
      </div>

      {!isCurrentStore && (
        <div className={styles.warningContainer} role="alert">
          <p className="font-bold">⚠️ Warning ⚠️</p>
          <p>
            You have items in your cart from another store. Please empty your
            cart or complete your current order before adding items from this
            store.
          </p>
        </div>
      )}

      {products.length > 0 ? (
        <div className="space-y-6">
          {products.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <Image
                src={getImageSrc(product)}
                alt={product.name}
                width={128}
                height={128}
                className={styles.productImage}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = defaultProductImage;
                }}
              />
              <div className={styles.productInfo}>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productDescription}>
                  {product.description}
                </p>
                <p className={styles.productPrice}>
                  ${product.price.toFixed(2)}
                </p>
              </div>
              <div className={styles.quantityControls}>
                <button
                  className={styles.quantityButton}
                  onClick={() => handleQuantityChange(product.id, -1)}
                  disabled={!isCurrentStore}
                >
                  -
                </button>
                <span className={styles.quantityDisplay}>
                  {quantities[product.id] || 0}
                </span>
                <button
                  className={styles.quantityButton}
                  onClick={() => handleQuantityChange(product.id, 1)}
                  disabled={!isCurrentStore}
                >
                  +
                </button>
              </div>
              <button
                className={styles.addToCartButton}
                onClick={() => handleAddToCart(product)}
                disabled={!isCurrentStore}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No products available for this store.</p>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { id } = context.params as { id: string };

    const { store, products } = getStoreAndProducts(id);

    if (!store) {
      return { props: { store: null, products: [] } };
    }

    return { props: { store, products } };
  } catch (error) {
    console.error("Error fetching store data:", error);
    return { props: { store: null, products: [] } };
  }
};

export default StoreDetail;
