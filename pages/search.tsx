import { NextPage, GetServerSideProps } from "next";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import StoreCard from "../components/StoreCard";
import { Store } from "../types/Store";
import { Product } from "../types/Product";
import path from "path";
import fs from "fs";

const ITEMS_PER_PAGE = 10;

interface SearchPageProps {
  stores: Store[];
  products: Product[];
}

const SearchPage: NextPage<SearchPageProps> = ({ stores, products }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredStores, setFilteredStores] = useState<Store[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (router.query.query) {
      setSearchTerm(router.query.query as string);
    }
  }, [router.query.query]);

  useEffect(() => {
    const updatedFilteredStores = searchTerm
      ? stores.filter((store) => {
          const nameMatch = store.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
          const categoryMatch = store.category
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
          return nameMatch || categoryMatch;
        })
      : stores;

    setFilteredStores(updatedFilteredStores);
    setCurrentPage(1); // Reset to the first page whenever the search term changes
  }, [searchTerm, stores]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?query=${encodeURIComponent(searchTerm)}`, undefined, {
      shallow: true,
    });
  };

  const handlePageChange = (delta: number) => {
    setCurrentPage((prev) =>
      Math.max(
        1,
        Math.min(
          Math.ceil(filteredStores.length / ITEMS_PER_PAGE),
          prev + delta
        )
      )
    );
  };

  const pageCount = Math.ceil(filteredStores.length / ITEMS_PER_PAGE);
  const currentStores = filteredStores.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">🔎 Search</h1>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex rounded-md shadow-sm">
          <input
            type="text"
            placeholder="Search stores or categories"
            className="block w-full px-6 py-4 rounded-md border border-gray-300 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 focus:border-blue-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="ml-4 px-6 py-4 rounded-md shadow bg-blue-500 text-white font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300"
          >
            Search
          </button>
        </div>
      </form>

      {filteredStores.length === 0 && (
        <p className="text-center text-gray-600 mb-8">
          No stores found. Try a different search term.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {currentStores.map((store) => (
          <StoreCard
            key={store.id}
            store={store}
            products={products.filter(
              (product) => product.storeId === store.id
            )} // 해당 스토어의 제품 필터링
          />
        ))}
      </div>

      {filteredStores.length > 0 && (
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
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<
  SearchPageProps
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

export default SearchPage;
