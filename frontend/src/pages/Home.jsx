import MainLayout from "../layouts/MainLayout";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <MainLayout>
      <section className={styles.hero}>
        <div className={styles.card}>
          <h1 className={styles.h1}>Welcome to MyAuth</h1>
          <p className={styles.p}>
            Modern authentication demo with React and CSS Modules. Clean UI,
            easy to extend.
          </p>
        </div>
      </section>
    </MainLayout>
  );
}
