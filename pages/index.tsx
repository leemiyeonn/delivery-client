import { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/home/Home.module.css";

const Home: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    // 검색어를 포함한 검색 결과 페이지로 리디렉션
    router.push(`/search?keyword=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Welcome to Our Delivery Service</h1>
      </div>

      <div className={styles.searchContainer}>
        <form onSubmit={handleSearch} className={styles.form}>
          <input
            type="text"
            placeholder="Search stores or cuisines"
            className={styles.input}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className={styles.button}>
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
