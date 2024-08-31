import { NextPage, GetServerSideProps } from "next";
import { useState } from "react";
import Link from "next/link";
import { Store } from "../../../types/stores/Store";
import { getStoresAndProductsData } from "../../../lib/data/storeData";
import { Pagination } from "../../../components/layout/Pagenation";
import styles from "../../../styles/admin/AdminDetail.module.css";

interface StoresProps {
  stores: Store[];
}

const Stores: NextPage<StoresProps> = ({ stores }) => {
  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(stores.length / ITEMS_PER_PAGE);

  const currentStores = stores.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>🛍️ Stores</h1>
      <div className={styles.grid}>
        {currentStores.map((store) => (
          <div className={styles.card} key={store.id}>
            <h2 className={styles.storeName}>{store.name}</h2>
            <p className={styles.storeDetail}>Category: {store.category}</p>
            <p className={styles.storeDetail}>
              Description: {store.description}
            </p>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<StoresProps> = async () => {
  const { stores } = getStoresAndProductsData();
  return { props: { stores } };
};

export default Stores;
