export const __size__ = 20;
export const __speed__ = 0.5;
export const __jump__ = 10;
export const __friction__ = 0.9;
export const __gravity = 0.5;
export const __follow__: Vector = { x: 0.05, y: 0.1 };

export interface Vector {
  x: number;
  y: number;
}
