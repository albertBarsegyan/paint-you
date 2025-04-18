import { useContext } from "react";

import { DrawingContext } from "../components/contexts/canvas-context";

export const useDrawing = () => {
  const context = useContext(DrawingContext);
  if (context === undefined) {
    throw new Error("useDrawing must be used within a DrawingProvider");
  }
  return context;
};
