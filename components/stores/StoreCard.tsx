import React from "react";
import Link from "next/link";
import { Store } from "../../types/stores/Store";
import styles from "../../styles/store/StoreCard.module.css";

interface StoreCardProps {
  store: Store;
}

const StoreCard: React.FC<StoreCardProps> = ({ store }) => {
  return (
    <Link href={`/stores/${store.id}`}>
      <div className={styles.card}>
        <div className={styles.cardContent}>
          <h3 className={styles.cardTitle}>{store.name}</h3>
          <p className={styles.cardDescription}>{store.description}</p>
        </div>
        <div className={styles.cardFooter}>
          <p className={styles.cardFooterText}>{store.categoryName}</p>
        </div>
      </div>
    </Link>
  );
};

export default StoreCard;
