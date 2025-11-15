import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import styles from "./MainLayout.module.css";

export default function MainLayout({ children }) {
  return (
    <div className={styles.page}>
      <Navbar />
      <Outlet />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
