import { NextPage, GetServerSideProps } from "next";
import { useState } from "react";
import { Store } from "../../types/stores/Store";
import { Product } from "../../types/products/Product";
import StoreCard from "../../components/stores/StoreCard";
import styles from "../../styles/store/Stores.module.css";
import { getStoresData } from "../../lib/data/storeData";
import {
  groupStoresByCategory,
  getStoresForCategory,
  handlePageChange,
} from "../../utils/stores/StoreUtils";

const ITEMS_PER_PAGE = 3;

interface StoresProps {
  stores: Store[];
  products: Product[];
}

const Stores: NextPage<StoresProps> = ({ stores, products }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPages, setCurrentPages] = useState<Record<string, number>>({});

  const groupedStores = groupStoresByCategory(stores);
  const categories = ["All", ...Object.keys(groupedStores)];

  const renderStores = (category: string | null) => {
    const categoryStores = getStoresForCategory(
      groupedStores,
      category,
      stores
    );
    const currentPage = currentPages[category || "All"] || 1;
    const pageCount = Math.ceil(categoryStores.length / ITEMS_PER_PAGE);
    const currentStores = categoryStores.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );

    return (
      <div className={styles.gridContainer}>
        <h2 className={styles.gridHeader}>{category || "All Stores"}</h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={() =>
              handlePageChange(
                currentPages,
                setCurrentPages,
                category || "All",
                -1
              )
            }
            disabled={currentPage === 1}
            className={styles.gridNavigationButton}
            aria-label="Previous page"
          >
            &#9664;
          </button>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 flex-grow">
            {currentStores.map((store) => (
              <div key={store.id} className={styles.storeCardWrapper}>
                <StoreCard
                  store={store}
                  products={products.filter(
                    (product) => product.storeId === store.id
                  )}
                />
              </div>
            ))}
          </div>
          <button
            onClick={() =>
              handlePageChange(
                currentPages,
                setCurrentPages,
                category || "All",
                1
              )
            }
            disabled={currentPage === pageCount}
            className={styles.gridNavigationButton}
            aria-label="Next page"
          >
            &#9654;
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>🛍️ Stores</h1>
        <div className={styles.categoryButtons}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() =>
                setSelectedCategory(category === "All" ? null : category)
              }
              className={`${styles.categoryButton} ${
                selectedCategory === category ||
                (category === "All" && selectedCategory === null)
                  ? styles.categoryButtonActive
                  : styles.categoryButtonInactive
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {selectedCategory === null
        ? categories.slice(1).map((category) => renderStores(category))
        : renderStores(selectedCategory)}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { stores, products } = getStoresData();
    return { props: { stores, products } };
  } catch (error) {
    console.error("Error reading or parsing stores file:", error);
    return { props: { stores: [], products: [] } };
  }
};

export default Stores;
