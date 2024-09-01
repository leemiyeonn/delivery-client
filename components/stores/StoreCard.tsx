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
            {store.description ? store.description : "No description available"}
          </p>
        </div>
        <div className={styles.cardFooter}>
          <p className={styles.cardFooterText}>
            {store.address ? store.address : "No address available"}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default StoreCard;
