import React, {
  createContext,
  RefObject,
  useCallback,
  useRef,
  useState,
} from "react";

import { DrawingState, initialDrawingState, Stroke } from "./types";

interface DrawingContextType {
  state: DrawingState;
  setDrawing: (start: boolean) => void;
  setColor: (color: string) => void;
  setSize: (size: number) => void;
  changeCurrentStroke: (stroke: Stroke | null) => void;
  changeStrokes: (strokes: Stroke[]) => void;
  clearCanvas: VoidFunction;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  changeSizes: ({ width, height }: { width?: number; height?: number }) => void;
}

export const DrawingContext = createContext<DrawingContextType | undefined>(
  undefined,
);

export const DrawingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState<DrawingState>(initialDrawingState);

  const setDrawing = useCallback((start: boolean) => {
    setState((prev) => ({ ...prev, isDrawing: start }));
  }, []);

  const setColor = useCallback((color: string) => {
    setState((prev) => ({ ...prev, brushColor: color }));
  }, []);

  const setSize = useCallback((size: number) => {
    setState((prev) => ({ ...prev, brushSize: size }));
  }, []);

  const changeCurrentStroke = useCallback((stroke: Stroke | null) => {
    setState((prev) => ({ ...prev, currentStroke: stroke }));
  }, []);

  const changeStrokes = useCallback((strokes: Stroke[]) => {
    setState((prev) => ({ ...prev, strokes }));
  }, []);

  const changeSizes = useCallback(
    ({ width, height }: { width?: number; height?: number }) => {
      setState((prev) => ({
        ...prev,
        width: width ?? prev.width,
        height: height ?? prev.height,
      }));
    },
    [],
  );

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    setState((prev) => ({ ...prev, strokes: [], currentStroke: null }));
  }, []);

  const value = {
    state,
    setDrawing,
    setColor,
    setSize,
    changeStrokes,
    changeCurrentStroke,
    clearCanvas,
    canvasRef,
    changeSizes,
  };

  return (
    <DrawingContext.Provider value={value}>{children}</DrawingContext.Provider>
  );
};
