import styles from "./styles.module.css";

export default function HeaderSection() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Welcome to DrawYou</h1>
        <div className={styles.underline}></div>
      </div>
    </div>
  );
}
