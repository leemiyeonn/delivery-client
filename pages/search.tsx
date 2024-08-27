import { NextPage, GetServerSideProps } from "next";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import StoreCard from "../components/StoreCard";
import { Store } from "../types/Store";
import path from "path";
import fs from "fs";

const SearchPage: NextPage<{ stores: Store[] }> = ({ stores }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (router.query.query) {
      setSearchTerm(router.query.query as string);
    }
  }, [router.query.query]);

  const filteredStores = stores.filter(
    (store) =>
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?query=${encodeURIComponent(searchTerm)}`, undefined, {
      shallow: true,
    });
  };

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStores.map((store) => (
          <StoreCard key={store.id} {...store} />
        ))}
      </div>

      {filteredStores.length === 0 && (
        <p className="text-center text-gray-600 mt-8">
          No stores found. Try a different search term.
        </p>
      )}
    </div>
  );
};

// 서버 사이드에서 JSON 파일을 읽어오는 함수
export const getServerSideProps: GetServerSideProps = async () => {
  const filePath = path.join(process.cwd(), "public", "data", "stores.json");
  const fileContent = fs.readFileSync(filePath, "utf8");
  const stores: Store[] = JSON.parse(fileContent);

  return {
    props: { stores },
  };
};

export default SearchPage;
