import { NextPage, GetServerSideProps } from "next";
import { useState } from "react";
import fs from "fs";
import path from "path";
import { Store } from "../../types/Store";
import StoreCard from "../../components/StoreCard";

const ITEMS_PER_PAGE = 3;

const Stores: NextPage<{ stores: Store[] }> = ({ stores }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPages, setCurrentPages] = useState<Record<string, number>>({});

  const groupStoresByCategory = (stores: Store[]) => {
    return stores.reduce((acc, store) => {
      if (!acc[store.category]) {
        acc[store.category] = [];
      }
      acc[store.category].push(store);
      return acc;
    }, {} as Record<string, Store[]>);
  };

  const groupedStores = groupStoresByCategory(stores);
  const categories = ["All", ...Object.keys(groupedStores)];

  const getStoresForCategory = (category: string | null) => {
    if (category === "All" || category === null) {
      return stores;
    }
    return groupedStores[category] || [];
  };

  const handlePageChange = (category: string, delta: number) => {
    setCurrentPages((prev) => ({
      ...prev,
      [category]: Math.max(1, (prev[category] || 1) + delta),
    }));
  };

  const renderStores = (category: string | null) => {
    const categoryStores = getStoresForCategory(category);
    const currentPage = currentPages[category || "All"] || 1;
    const pageCount = Math.ceil(categoryStores.length / ITEMS_PER_PAGE);
    const currentStores = categoryStores.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );

    return (
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">{category || "All Stores"}</h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => handlePageChange(category || "All", -1)}
            disabled={currentPage === 1}
            className="p-2 rounded-full bg-gray-200 text-gray-800 disabled:opacity-50"
            aria-label="Previous page"
          >
            &#9664;
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-grow">
            {currentStores.map((store) => (
              <StoreCard key={store.id} {...store} />
            ))}
          </div>
          <button
            onClick={() => handlePageChange(category || "All", 1)}
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">🛍️ Stores</h1>

      <div className="flex flex-wrap gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() =>
              setSelectedCategory(category === "All" ? null : category)
            }
            className={`px-4 py-2 rounded-full font-semibold transition-colors ${
              selectedCategory === category ||
              (category === "All" && selectedCategory === null)
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {selectedCategory === null
        ? categories.slice(1).map((category) => renderStores(category))
        : renderStores(selectedCategory)}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const filePath = path.join(process.cwd(), "public", "data", "stores.json");
    const fileContent = fs.readFileSync(filePath, "utf8");
    const stores: Store[] = JSON.parse(fileContent);
    return { props: { stores } };
  } catch (error) {
    console.error("Error reading stores file:", error);
    return { props: { stores: [] } };
  }
};

export default Stores;
