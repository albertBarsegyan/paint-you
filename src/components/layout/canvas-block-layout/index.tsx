import { DrawingProvider } from "../../contexts/canvas-context";
import { ReactLazyPreload } from "../../react-lazy-preload";
import styles from "./styles.module.css";

export const InteractionsBlock = ReactLazyPreload(
  () => import("../../interactions-block"),
);

export const CanvasBlock = ReactLazyPreload(() => import("../../canvas-block"));

export const HeaderSection = ReactLazyPreload(
  () => import("../../header-section"),
);

export function CanvasBlockLayout() {
  return (
    <DrawingProvider>
      <HeaderSection />
      <div className={styles.wrapper}>
        <InteractionsBlock />
        <CanvasBlock />
      </div>
    </DrawingProvider>
  );
}
