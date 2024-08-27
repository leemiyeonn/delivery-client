import { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl mt-48 mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-4xl md:text-5xl">
          Welcome to Our Delivery Service
        </h1>
      </div>

      <div className="w-full max-w-2xl">
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row gap-4"
        >
          <input
            type="text"
            placeholder="Search stores or cuisines"
            className="flex-grow px-4 py-3 rounded-md border border-gray-300 text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 transition duration-150 ease-in-out"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
