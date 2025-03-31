import {CanvasBlock} from "../../canvas-block";
import {InteractionsBlock} from "../../interactions-block";
import styles from './styles.module.css'
import {DrawingProvider} from "../../contexts/canvas-context";
import {HeaderSection} from "../../header-section";

export function CanvasBlockLayout() {
  return (
    <DrawingProvider>
      <HeaderSection/>
      <div className={styles.wrapper}>
        <CanvasBlock/>
        <InteractionsBlock/>
      </div>
    </DrawingProvider>

  );
}
