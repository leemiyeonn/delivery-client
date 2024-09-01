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
  return (
    <Link href={`/stores/${store.id}`}>
      <div className={styles.card}>
        <div className={styles.cardContent}>
          <h3 className={styles.cardTitle}>{store.name}</h3>
          <p className={styles.cardDescription}>
            {store.address ? store.address : "No description available"}
          </p>
          <p className={styles.cardProductCount}>
            {products.length} products available
          </p>
        </div>
        <div className={styles.cardFooter}>
          <p className={styles.cardFooterText}>
            {store.categoryName && store.categoryName.length > 0
              ? store.categoryName.join(", ")
              : "No categories"}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default StoreCard;
