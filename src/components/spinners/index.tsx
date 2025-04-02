import styles from "./styles.module.css";

export const DotWaveSpinner = () => {
  return (
    <div className={styles.container}>
      <div className={styles.dot1} />
      <div className={styles.dot2} />
      <div className={styles.dot3} />
      <div className={styles.dot4} />
    </div>
  );
};
