import { Stroke } from "../components/contexts/canvas-context/types.ts";

export const drawStrokeUtil = (
  ctx: CanvasRenderingContext2D,
  stroke: Stroke,
): void => {
  if (stroke.points.length === 0) return;

  ctx.strokeStyle = stroke.color;
  ctx.lineWidth = stroke.size;
  ctx.lineCap = "round";

  ctx.beginPath();
  ctx.moveTo(stroke.points[0].x, stroke.points[0].y);

  for (let i = 1; i < stroke.points.length; i++) {
    ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
  }

  ctx.stroke();
};

export const getCanvasCoordinates = (
  canvas: HTMLCanvasElement,
  clientX: number,
  clientY: number,
) => {
  const rect = canvas.getBoundingClientRect();

  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  return {
    x: (clientX - rect.left) * scaleX,
    y: (clientY - rect.top) * scaleY,
  };
};

export const canvasToSVG = (canvas: HTMLCanvasElement) => {
  const width = canvas.width;
  const height = canvas.height;
  const ctx = canvas.getContext("2d");
  const imageData = ctx?.getImageData(0, 0, width, height);

  if (!imageData?.data) return;

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">`;
  svg += `<foreignObject width="100%" height="100%">`;
  svg += `<div xmlns="http://www.w3.org/1999/xhtml">`;
  svg += `<canvas id="canvas" width="${width}" height="${height}"></canvas>`;
  svg += `<script>`;
  svg += `(function() {`;
  svg += `const canvas = document.getElementById('canvas');`;
  svg += `const ctx = canvas.getContext('2d');`;
  svg += `const imageData = new ImageData(new Uint8ClampedArray(${JSON.stringify(Array.from(imageData.data))}), ${width}, ${height});`;
  svg += `ctx.putImageData(imageData, 0, 0);`;
  svg += `})();`;
  svg += `</script>`;
  svg += `</div>`;
  svg += `</foreignObject>`;
  svg += `</svg>`;

  return svg;
};

export const getTouchPos = (canvas: HTMLCanvasElement, touch: React.Touch) => {
  const rect = canvas.getBoundingClientRect();
  return {
    x: touch.clientX - rect.left,
    y: touch.clientY - rect.top,
  };
};
