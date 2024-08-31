import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import StoreCard from "../../components/stores/StoreCard";
import { Store } from "../../types/stores/Store";
import styles from "../../styles/store/StoresPage.module.css";
import axios from "axios";

const API = "http://localhost:8080/api/v1";
const ITEMS_PER_PAGE = 9;

interface StoresPageProps {
  initialStores: {
    content: Store[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
  };
}

const StoresPage: NextPage<StoresPageProps> = ({ initialStores }) => {
  const [stores, setStores] = useState(initialStores.content);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(initialStores.totalPages);

  useEffect(() => {
    fetchStores(currentPage);
  }, [currentPage]);

  const fetchStores = async (page: number) => {
    try {
      const response = await axios.get(`${API}/stores`, {
        params: {
          page: page,
          size: ITEMS_PER_PAGE,
          sort: "name,asc", // 기본 정렬 옵션
        },
        withCredentials: true,
      });
      setStores(response.data.data.content);
      setTotalPages(response.data.data.totalPages);
    } catch (error) {
      console.error("Error fetching stores:", error);
    }
  };

  const handlePageChange = (delta: number) => {
    setCurrentPage((prev) =>
      Math.max(0, Math.min(totalPages - 1, prev + delta))
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>🛍️ Stores</h1>
      </div>

      <div className={styles.gridContainer}>
        {stores.map((store) => (
          <StoreCard key={store.id} store={store} />
        ))}
      </div>

      <div className={styles.paginationContainer}>
        <button
          onClick={() => handlePageChange(-1)}
          disabled={currentPage === 0}
          className={styles.paginationButton}
          aria-label="Previous page"
        >
          &#9664;
        </button>
        <span>
          Page {currentPage + 1} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === totalPages - 1}
          className={styles.paginationButton}
          aria-label="Next page"
        >
          &#9654;
        </button>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const response = await axios.get(`${API}/stores`, {
      params: {
        page: 0,
        size: ITEMS_PER_PAGE,
        sort: "name,asc",
      },
      withCredentials: true,
    });
    return {
      props: {
        initialStores: response.data.data,
      },
    };
  } catch (error) {
    console.error("Error fetching initial stores:", error);
    return {
      props: {
        initialStores: {
          content: [],
          totalPages: 0,
          totalElements: 0,
          size: ITEMS_PER_PAGE,
          number: 0,
        },
      },
    };
  }
}

export default StoresPage;
