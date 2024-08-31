import { NextPage, GetStaticProps } from "next";
import { useState } from "react";
import { User } from "../../../types/users/User";
import { getUsersData } from "../../../lib/data/userData";
import styles from "../../../styles/admin/AdminDetail.module.css";
import { Pagination } from "../../../components/layout/Pagenation";

interface UsersProps {
  users: User[];
}

const Users: NextPage<UsersProps> = ({ users }) => {
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);

  const currentUsers = users.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>👥 User Management</h1>
      <div className={styles.grid}>
        {currentUsers.map((user) => (
          <div className={styles.card} key={user.id}>
            <h2 className={styles.userName}>{user.name}</h2>
            <p className={styles.userDetail}>Email: {user.email}</p>
            <p className={styles.userDetail}>Role: {user.role}</p>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export const getStaticProps: GetStaticProps<UsersProps> = async () => {
  const users = getUsersData();
  return { props: { users } };
};

export default Users;
