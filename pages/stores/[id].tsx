import { NextPage, GetServerSideProps } from "next";
import { useState } from "react";
import { Store } from "../../types/stores/Store";
import { Product } from "../../types/products/Product";
import { useCart } from "../../contexts/cart/CartContext";
import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/store/StoreDetail.module.css";

const API_URL = "https://gunwoo.store/api/v1";

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

  const formatPriceToWon = (price: number) => {
    return price.toLocaleString("ko-KR") + "원";
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.storeHeader}>🍽️ {store.name}</h1>
      <p className={styles.storeDescription}>{store.address}</p>

      <div className={styles.menuSection}>
        <h2 className={styles.menuHeader}>🛍️ menu</h2>
        <Link href="/cart" className={styles.cartButton}>
          Cart ({cartItemsCount})
        </Link>
      </div>

      {!isCurrentStore && (
        <div className={styles.warningContainer} role="alert">
          <p className="font-bold">⚠️ 주의 ⚠️</p>
          <p>
            다른 가게의 상품이 장바구니에 있습니다. 이 가게의 상품을 추가하려면
            먼저 장바구니를 비우거나 현재 주문을 완료하세요.
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
                  {formatPriceToWon(product.price)}
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
                Add to cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>이 가게에 상품이 없습니다.</p>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { id } = context.params as { id: string };

    // Fetching store data
    const storeResponse = await fetch(`${API_URL}/stores/${id}`);
    const storeData = await storeResponse.json();

    const store = storeData.data || null;

    // Fetching products data for the store
    const productsResponse = await fetch(`${API_URL}/products/stores/${id}`);
    const productsData = await productsResponse.json();

    const products = productsData.data.content || [];

    return { props: { store, products } };
  } catch (error) {
    console.error("Error fetching store data:", error);
    return { props: { store: null, products: [] } };
  }
};

export default StoreDetail;
