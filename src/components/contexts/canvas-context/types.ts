export interface Point {
  x: number;
  y: number;
}

export interface Stroke {
  points: Point[];
  color: string;
  size: number;
}

export interface DrawingState {
  isDrawing: boolean;
  brushColor: string;
  brushSize: number;
  currentStroke: Stroke | null
  strokes: Stroke[]
  width:number,
  height:number
}

export const initialDrawingState: DrawingState = {
  isDrawing: false,
  brushColor: '#000000',
  brushSize: 5,
  currentStroke: null,
  strokes: [],
  width:400,
  height:400,
};
