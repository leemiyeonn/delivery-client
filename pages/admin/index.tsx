import { NextPage } from "next";
import Link from "next/link";
import styles from "../../styles/admin/Admin.module.css";

const Admin: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>📣 Admin Dashboard</h1>
      <div className={styles.menu}>
        <Link href="/admin/users" className={styles.menuItem}>
          User Management
        </Link>
        <Link href="/admin/orders" className={styles.menuItem}>
          Order Management
        </Link>
        <Link href="/admin/stores" className={styles.menuItem}>
          Store Management
        </Link>
      </div>
    </div>
  );
};

export default Admin;
