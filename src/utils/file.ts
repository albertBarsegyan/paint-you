import {canvasToSVG} from "./canvas.ts";

export const downloadFile = ({canvas, fileType}: { canvas: HTMLCanvasElement, fileType: string }) => {
  const link = document.createElement("a")

  if (fileType === "svg") {
    const svgData = canvasToSVG(canvas)

    if (!svgData) return;

    const svgBlob = new Blob([svgData], {type: "image/svg+xml"})
    link.href = URL.createObjectURL(svgBlob)
    link.download = "drawing.svg"
  } else {
 
    const quality = fileType === "jpg" ? 0.95 : 1.0
    link.href = canvas.toDataURL(`image/${fileType}`, quality)
    link.download = `drawing.${fileType}`
  }

  link.click()
}
