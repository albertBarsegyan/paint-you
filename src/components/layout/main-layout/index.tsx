import {PropsWithChildren} from "react";
import styles from './styles.module.css'

export function MainLayout({children}: PropsWithChildren) {
  return (
    <div className={styles.layoutWrapper}>
      <div className={styles.layoutContent}>{children}</div>
    </div>
  );
}
