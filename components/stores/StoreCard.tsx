import React from "react";
import Link from "next/link";
import { Store } from "../../types/stores/Store";
import { Product } from "../../types/products/Product";
import styles from "../../styles/store/StoreCard.module.css";

interface StoreCardProps {
  store: Store;
  products: Product[];
}

const StoreCard: React.FC<StoreCardProps> = ({ store, products }) => {
  const priceRange =
    products.length > 0
      ? `$${Math.min(...products.map((p) => p.price)).toFixed(2)} - $${Math.max(
          ...products.map((p) => p.price)
        ).toFixed(2)}`
      : "N/A";

  return (
    <Link href={`/stores/${store.id}`}>
      <div className={styles.card}>
        <div className={styles.cardContent}>
          <h3 className={styles.cardTitle}>{store.name}</h3>
          <p className={styles.cardDescription}>{store.description}</p>
        </div>
        <div className={styles.cardFooter}>
          <p className={styles.cardFooterText}>
            {store.category} • {products.length} products
          </p>
          <p className={styles.cardFooterText}>Price range: {priceRange}</p>
        </div>
      </div>
    </Link>
  );
};

export default StoreCard;
