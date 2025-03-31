import {useDrawing} from "../../hooks/use-drawing.tsx";
import styles from './styles.module.css';
import {useState} from "react";
import {downloadFile} from "../../utils/file.ts";

const defaultFileType = 'png'

export function InteractionsBlock() {
  const [fileType, setFileType] = useState(defaultFileType)
  const {setColor, canvasRef, state: {brushColor, brushSize}, setSize, clearCanvas} = useDrawing()

  const downloadCanvas = () => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current

    downloadFile({canvas, fileType})
  }

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>
        Color:
        <input
          type="color"
          value={brushColor}
          className={styles.inputColor}
          onChange={(e) => setColor(e.target.value)}
        />
      </label>

      <label className={styles.brushSizeLabel}>
        Brush Size:
        <div className={styles.brushSize}>
          <input
            type="range"
            min="1"
            max="50"
            value={brushSize}
            onChange={(e) => setSize(Number(e.target.value))}
          />

          <span className={styles.brushSizeValue}>{brushSize}PX</span>

        </div>
      </label>


      <div className={styles.buttonWrapper}>
        <div>
          <div className={styles.fileTypeSelector}>
            <select value={fileType} onChange={(e) => setFileType(e.target.value)} className={styles.fileTypeDropdown}>
              <option value="png">PNG</option>
              <option value="jpg">JPG</option>
              <option value="svg">SVG</option>
            </select>
          </div>
        </div>

        <button className={styles.button} onClick={downloadCanvas}>
          Download
        </button>
      </div>

      <button className={styles.button} onClick={clearCanvas}>
        Clear Canvas
      </button>
    </div>
  );
}
