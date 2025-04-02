import React, { useCallback, useEffect, useRef } from "react";

import { useDrawing } from "../../hooks/use-drawing.tsx";
import { drawStrokeUtil, getTouchPos } from "../../utils/canvas.ts";
import styles from "./styles.module.css";

const CANVAS_BG = "white";

const CanvasBlock = () => {
  const {
    state: {
      isDrawing,
      brushColor,
      brushSize,
      currentStroke,
      strokes,
      width,
      height,
    },
    canvasRef,
    setDrawing,
    changeStrokes,
    changeCurrentStroke,
  } = useDrawing();

  const drawingRef = useRef(isDrawing);
  const currentStrokeRef = useRef(currentStroke);
  const brushPropsRef = useRef({ color: brushColor, size: brushSize });

  useEffect(() => {
    drawingRef.current = isDrawing;
    currentStrokeRef.current = currentStroke;
    brushPropsRef.current = { color: brushColor, size: brushSize };
  }, [isDrawing, currentStroke, brushColor, brushSize]);

  const animationFrameRef = useRef<number | null>(null);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  const draw = useCallback(
    (x: number, y: number) => {
      if (!drawingRef.current || !currentStrokeRef.current) return;

      if (
        lastPointRef.current &&
        Math.abs(lastPointRef.current.x - x) < 2 &&
        Math.abs(lastPointRef.current.y - y) < 2
      ) {
        return;
      }

      lastPointRef.current = { x, y };

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      animationFrameRef.current = requestAnimationFrame(() => {
        changeCurrentStroke({
          ...currentStrokeRef.current!,
          points: [...currentStrokeRef.current!.points, { x, y }],
        });
      });
    },
    [changeCurrentStroke],
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    draw(
      e.clientX - e.currentTarget.getBoundingClientRect().left,
      e.clientY - e.currentTarget.getBoundingClientRect().top,
    );
  };

  const drawStroke = useCallback(drawStrokeUtil, []);

  const startDrawing = useCallback(
    (x: number, y: number) => {
      changeCurrentStroke({
        points: [{ x, y }],
        color: brushPropsRef.current.color,
        size: brushPropsRef.current.size,
      });
      setDrawing(true);
      lastPointRef.current = { x, y };
    },
    [changeCurrentStroke, setDrawing],
  );

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    startDrawing(
      e.clientX - e.currentTarget.getBoundingClientRect().left,
      e.clientY - e.currentTarget.getBoundingClientRect().top,
    );
  };

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

    const ctx = canvas.getContext("2d");
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

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const touch = e.touches[0];
    const pos = getTouchPos(canvas, touch);
    startDrawing(pos.x, pos.y);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const touch = e.touches[0];
    const pos = getTouchPos(canvas, touch);
    draw(pos.x, pos.y);
  };

  useEffect(() => {
    return () => {
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
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
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={endDrawing}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={endDrawing}
        style={{
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          cursor: "crosshair",
        }}
      />
    </div>
  );
};

export default CanvasBlock;
