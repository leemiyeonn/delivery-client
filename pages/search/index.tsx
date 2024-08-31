import React, { useState, useMemo } from "react";
import { NextPage, GetServerSideProps } from "next";
import StoreCard from "../../components/stores/StoreCard";
import { Store } from "../../types/stores/Store";
import { Product } from "../../types/products/Product";
import styles from "../../styles/store/StoresPage.module.css";
import {
  sortStores,
  paginateStores,
  calculatePageCount,
  SortOption,
} from "../../utils/stores/StoreUtils";

const API = "http://localhost:8080/api/v1/";

const ITEMS_PER_PAGE = 9;

interface StoresPageProps {
  stores: Store[];
  products: Product[];
}

const StoresPage: NextPage<StoresPageProps> = ({ stores, products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState<SortOption>("name_asc");

  const sortedStores = useMemo(
    () => sortStores(stores, sortOption),
    [stores, sortOption]
  );

  const pageCount = useMemo(
    () => calculatePageCount(sortedStores, ITEMS_PER_PAGE),
    [sortedStores]
  );

  const currentStores = useMemo(
    () => paginateStores(sortedStores, currentPage, ITEMS_PER_PAGE),
    [sortedStores, currentPage]
  );

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value as SortOption);
    setCurrentPage(1); // Reset to first page on sort change
  };

  const handlePageChange = (delta: number) => {
    setCurrentPage((prev) => Math.max(1, Math.min(pageCount, prev + delta)));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>🛍️ Stores</h1>
        <div className={styles.sortContainer}>
          <label htmlFor="sort" className={styles.sortLabel}></label>
          <select
            id="sort"
            value={sortOption}
            onChange={handleSortChange}
            className={styles.sortSelect}
          >
            <option value="name_asc">Name (A-Z)</option>
            <option value="name_desc">Name (Z-A)</option>
            <option value="date_asc">Date (Oldest first)</option>
            <option value="date_desc">Date (Newest first)</option>
          </select>
        </div>
      </div>

      <div className={styles.gridContainer}>
        {currentStores.map((store) => (
          <StoreCard
            key={store.id}
            store={store}
            products={products.filter(
              (product) => product.storeId === store.id
            )}
          />
        ))}
      </div>

      <div className={styles.paginationContainer}>
        <button
          onClick={() => handlePageChange(-1)}
          disabled={currentPage === 1}
          className={styles.paginationButton}
          aria-label="Previous page"
        >
          &#9664;
        </button>
        <span>
          Page {currentPage} of {pageCount}
        </span>
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === pageCount}
          className={styles.paginationButton}
          aria-label="Next page"
        >
          &#9654;
        </button>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<
  StoresPageProps
> = async () => {
  try {
    const storesResponse = await fetch(API + "/stores");
    const productsResponse = await fetch(API + "/stores");

    if (!storesResponse.ok || !productsResponse.ok) {
      throw new Error("Failed to fetch data");
    }

    const stores: Store[] = await storesResponse.json();
    const products: Product[] = await productsResponse.json();

    return {
      props: {
        stores,
        products,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        stores: [],
        products: [],
      },
    };
  }
};

export default StoresPage;
