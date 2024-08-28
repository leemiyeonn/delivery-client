import React, { useState, useMemo } from "react";
import { NextPage, GetServerSideProps } from "next";
import StoreCard from "../components/StoreCard";
import { Store } from "../types/Store";
import { Product } from "../types/Product";
import path from "path";
import fs from "fs";

const ITEMS_PER_PAGE = 9;

interface StoresPageProps {
  stores: Store[];
  products: Product[];
}

type SortOption = "name_asc" | "name_desc" | "date_asc" | "date_desc";

const StoresPage: NextPage<StoresPageProps> = ({ stores, products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState<SortOption>("name_asc");

  const sortedStores = useMemo(() => {
    return [...stores].sort((a, b) => {
      const [field, direction] = sortOption.split("_");
      const multiplier = direction === "asc" ? 1 : -1;

      switch (field) {
        case "name":
          return multiplier * a.name.localeCompare(b.name);
        case "date":
          return (
            multiplier *
            (new Date(a.created_at).getTime() -
              new Date(b.created_at).getTime())
          );
        default:
          return 0;
      }
    });
  }, [stores, sortOption]);

  const pageCount = Math.ceil(sortedStores.length / ITEMS_PER_PAGE);
  const currentStores = sortedStores.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value as SortOption);
    setCurrentPage(1);
  };

  const handlePageChange = (delta: number) => {
    setCurrentPage((prev) => Math.max(1, Math.min(pageCount, prev + delta)));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">🛍️ Stores</h1>
        <div className="flex items-center">
          <label htmlFor="sort" className="mr-2 text-gray-700"></label>
          <select
            id="sort"
            value={sortOption}
            onChange={handleSortChange}
            className="p-2 border bg-transparent text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-200"
          >
            <option value="name_asc">Name (A-Z)</option>
            <option value="name_desc">Name (Z-A)</option>
            <option value="date_asc">Date (Oldest first)</option>
            <option value="date_desc">Date (Newest first)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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

      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={() => handlePageChange(-1)}
          disabled={currentPage === 1}
          className="p-2 rounded-full bg-gray-200 text-gray-800 disabled:opacity-50"
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
          className="p-2 rounded-full bg-gray-200 text-gray-800 disabled:opacity-50"
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
    const filePath = path.join(process.cwd(), "public", "data", "stores.json");
    const fileContent = fs.readFileSync(filePath, "utf8");
    const parsedData = JSON.parse(fileContent);

    const stores: Store[] = parsedData.flatMap(
      (category: any) => category.stores || []
    );
    const products: Product[] = parsedData.flatMap(
      (category: any) => category.products || []
    );

    return { props: { stores, products } };
  } catch (error) {
    console.error("Error reading or parsing stores file:", error);
    return { props: { stores: [], products: [] } };
  }
};

export default StoresPage;
