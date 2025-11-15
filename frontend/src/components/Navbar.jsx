import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // check if logged in
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <span className={styles.title}>MyAuth</span>
      </div>
      <nav className={styles.nav}>
        <Link to="/" className={styles.link}>
          Home
        </Link>

        {token ? (
          <>
            <Link to="/dashboard" className={styles.link}>
              Dashboard
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className={styles.link}>
              Login
            </Link>
            <Link to="/register" className={styles.link}>
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
