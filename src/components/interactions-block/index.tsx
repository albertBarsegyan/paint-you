import { ChangeEvent, useState } from "react";

import { useDrawing } from "../../hooks/use-drawing.tsx";
import { downloadFile } from "../../utils/file.ts";
import styles from "./styles.module.css";
import { paperSizeValidator } from "./utils.ts";

const DEFAULT_FILE_TYPE = "png";

export default function InteractionsBlock() {
  const {
    state: { width, height },
    changeSizes,
  } = useDrawing();
  const [fileType, setFileType] = useState(DEFAULT_FILE_TYPE);
  const {
    setColor,
    canvasRef,
    state: { brushColor, brushSize },
    setSize,
    clearCanvas,
  } = useDrawing();

  const downloadCanvas = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;

    downloadFile({ canvas, fileType });
  };

  const onNumericChange =
    (type: "height" | "width") => (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const validValue = paperSizeValidator(value);

      if (validValue !== null) {
        changeSizes({ [type]: validValue });
      } else if (value === "") {
        changeSizes({ [type]: 0 });
      }
    };

  return (
    <div className={styles.wrapper}>
      <div>
        <label className={styles.label}>
          Width (px):
          <input
            className={styles.inputColor}
            value={width}
            pattern={"[0-9]*"}
            onChange={onNumericChange("width")}
          />
        </label>

        <label className={styles.label}>
          Height (px):
          <input
            className={styles.inputColor}
            value={height}
            pattern={"[0-9]*"}
            onChange={onNumericChange("height")}
          />
        </label>
      </div>

      <label className={styles.label}>
        Color:
        <input
          type="color"
          value={brushColor}
          className={styles.colorBlock}
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
            <select
              value={fileType}
              onChange={(e) => setFileType(e.target.value)}
              className={styles.fileTypeDropdown}
            >
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
