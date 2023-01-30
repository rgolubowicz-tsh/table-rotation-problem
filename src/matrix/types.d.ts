export type MatrixElement = string | number;

export interface IMatrix {
  isValid: boolean;
  matrix: MatrixElement[][];
  rows: number;
  columns: number;
  ringsNumber: number;
  flatten: MatrixElement[];
  rotateRingRight: (ringNumber: number) => void;
  rotateAllRings: VoidFunction;
}
