import { NextPage } from "next";
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/router";
import { Store } from "../../types/stores/Store";
import StoreCard from "../../components/stores/StoreCard";
import styles from "../../styles/store/StoresPage.module.css";

// Assume SortOption is defined elsewhere in your code
type SortOption = "name_asc" | "name_desc" | "date_asc" | "date_desc";

interface Pageable {
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

interface ApiResponse {
  data: {
    content: Store[];
    pageable: Pageable;
  };
  success: string;
}

const ITEMS_PER_PAGE = 9;

const SearchResults: NextPage = () => {
  const router = useRouter();
  const { keyword } = router.query;
  const [stores, setStores] = useState<Store[]>([]);
  const [pageable, setPageable] = useState<Pageable | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState<SortOption>("name_asc");

  // Mock functions to be replaced with actual implementation
  const sortStores = (stores: Store[], sortOption: SortOption) => stores;
  const calculatePageCount = (stores: Store[], itemsPerPage: number) => {
    return Math.ceil(stores.length / itemsPerPage);
  };
  const paginateStores = (
    stores: Store[],
    currentPage: number,
    itemsPerPage: number
  ) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return stores.slice(startIndex, startIndex + itemsPerPage);
  };

  useEffect(() => {
    console.log("Keyword received:", keyword);

    if (keyword) {
      const fetchStores = async () => {
        try {
          let url = `http://localhost:8080/api/v1/stores`;
          if (pageable?.totalPages !== 0) {
            const queryParams = new URLSearchParams({
              keyword: keyword as string,
              page: (currentPage - 1).toString(), // 0-based page index for the API
              size: ITEMS_PER_PAGE.toString(),
              sort: sortOption.replace("_", ","),
            });
            url += `?${queryParams.toString()}`;
          }

          console.log("Fetching URL:", url);

          const response = await fetch(url);

          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }

          const data: ApiResponse = await response.json();
          console.log("Received data:", data);

          setStores(data.data.content || []); // Ensure stores is never undefined
          setPageable(data.data.pageable);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchStores();
    } else {
      console.log("Keyword is not available");
      setLoading(false);
    }
  }, [keyword, currentPage, sortOption]);

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

  if (loading) {
    return <div>Loading...</div>;
  }

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
            products={[]} // Assuming products are passed or you can fetch them if necessary
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

export default SearchResults;
