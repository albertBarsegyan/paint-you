import { DotWaveSpinner } from "../spinners";
import styles from "./styles.module.css";

export function Loader() {
  return (
    <div className={styles.loaderWrapper}>
      <DotWaveSpinner />
    </div>
  );
}
