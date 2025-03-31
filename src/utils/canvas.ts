export const drawUtil = ({canvasCtx, brushColor, brushSize, x, y}: {
  canvasCtx: CanvasRenderingContext2D,
  brushSize: number;
  brushColor: string;
  x: number;
  y: number;
}) => {
  canvasCtx.strokeStyle = brushColor;
  canvasCtx.lineWidth = brushSize;
  canvasCtx.lineCap = 'round';
  canvasCtx.beginPath();
  canvasCtx.moveTo(
    x, y
  );
}


export const getCanvasCoordinates = (
  canvas: HTMLCanvasElement,
  clientX: number,
  clientY: number
) => {
  const rect = canvas.getBoundingClientRect();

  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  return {
    x: (clientX - rect.left) * scaleX,
    y: (clientY - rect.top) * scaleY
  };
};


export const canvasToSVG = (canvas: HTMLCanvasElement) => {
  const width = canvas.width
  const height = canvas.height
  const ctx = canvas.getContext("2d")
  const imageData = ctx?.getImageData(0, 0, width, height)

  if (!imageData?.data) return;

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">`
  svg += `<foreignObject width="100%" height="100%">`
  svg += `<div xmlns="http://www.w3.org/1999/xhtml">`
  svg += `<canvas id="canvas" width="${width}" height="${height}"></canvas>`
  svg += `<script>`
  svg += `(function() {`
  svg += `const canvas = document.getElementById('canvas');`
  svg += `const ctx = canvas.getContext('2d');`
  svg += `const imageData = new ImageData(new Uint8ClampedArray(${JSON.stringify(Array.from(imageData.data))}), ${width}, ${height});`
  svg += `ctx.putImageData(imageData, 0, 0);`
  svg += `})();`
  svg += `</script>`
  svg += `</div>`
  svg += `</foreignObject>`
  svg += `</svg>`

  return svg
}
