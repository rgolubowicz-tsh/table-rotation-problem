export type MatrixElement = string | number;

export interface MatrixInterface {
  matrix: MatrixElement[][];
  rows: number;
  columns: number;
  ringsNumber: number;
  flatten: MatrixElement[];
  rotateRingRight: (ringNumber: number) => void;
  rotateAllRings: VoidFunction;
}
