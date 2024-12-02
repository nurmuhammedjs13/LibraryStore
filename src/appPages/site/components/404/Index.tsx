import React from "react";
import { useRouter } from "next/navigation";
import styles from "./Index.module.scss";

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <div className={styles.Pageund}>
      <div className="container">
        <div className={styles.content}>
          <h1 className={styles.title}>404</h1>
          <p className={styles.subtitle}>
            Упс! Страница, которую вы ищете, потерялась среди книг.
          </p>
          <button
            className={styles.backButton}
            onClick={() => router.back()}
          >
            Назад
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
