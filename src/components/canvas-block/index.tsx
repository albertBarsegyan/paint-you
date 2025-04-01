import React, {useCallback, useEffect, useRef} from "react";
import {useDrawing} from "../../hooks/use-drawing.tsx";
import {Stroke} from "../contexts/canvas-context/types.ts";
import styles from './styles.module.css'


const CANVAS_BG = 'white'

export const CanvasBlock = () => {
  const {
    state: {isDrawing, brushColor, brushSize, currentStroke, strokes, width, height},
    canvasRef,
    setDrawing,
    changeStrokes,
    changeCurrentStroke
  } = useDrawing();

  const drawingRef = useRef(isDrawing);
  const currentStrokeRef = useRef(currentStroke);
  const brushPropsRef = useRef({color: brushColor, size: brushSize});

  useEffect(() => {
    drawingRef.current = isDrawing;
    currentStrokeRef.current = currentStroke;
    brushPropsRef.current = {color: brushColor, size: brushSize};
  }, [isDrawing, currentStroke, brushColor, brushSize]);

  const animationFrameRef = useRef<number | null>(null);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  const draw = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current || !currentStrokeRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (lastPointRef.current &&
      Math.abs(lastPointRef.current.x - x) < 2 &&
      Math.abs(lastPointRef.current.y - y) < 2) {
      return;
    }

    lastPointRef.current = {x, y};

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      changeCurrentStroke({
        ...currentStrokeRef.current!,
        points: [...currentStrokeRef.current!.points, {x, y}],
      });
    });
  }, [changeCurrentStroke, canvasRef]);

  const drawStroke = useCallback((ctx: CanvasRenderingContext2D, stroke: Stroke) => {
    if (stroke.points.length === 0) return;

    ctx.strokeStyle = stroke.color;
    ctx.lineWidth = stroke.size;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(stroke.points[0].x, stroke.points[0].y);

    for (let i = 1; i < stroke.points.length; i++) {
      ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
    }

    ctx.stroke();
  }, []);

  const startDrawing = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    changeCurrentStroke({
      points: [{x, y}],
      color: brushPropsRef.current.color,
      size: brushPropsRef.current.size,
    });

    setDrawing(true);
    lastPointRef.current = {x, y};
  }, [changeCurrentStroke, setDrawing, canvasRef]);

  const endDrawing = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    if (currentStrokeRef.current) {
      changeStrokes([...strokes, currentStrokeRef.current!]);
      changeCurrentStroke(null);
    }

    setDrawing(false);
    lastPointRef.current = null;
  }, [changeCurrentStroke, changeStrokes, setDrawing, strokes]);

  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = CANVAS_BG;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    strokes.forEach((stroke) => {
      drawStroke(ctx, stroke);
    });

    if (currentStrokeRef.current) {
      drawStroke(ctx, currentStrokeRef.current);
    }
  }, [canvasRef, drawStroke, strokes]);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
    };
  }, []);

  useEffect(() => {
    const animationId = requestAnimationFrame(renderCanvas);
    return () => cancelAnimationFrame(animationId);
  }, [renderCanvas, strokes, currentStroke]);

  return (
    <div className={styles.wrapper}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={endDrawing}
        style={{boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', cursor: "crosshair"}}
      />
    </div>
  );
};
