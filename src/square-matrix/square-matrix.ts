import { Matrix, MatrixElement } from "../matrix";
import { DifferentColumnsAndRowsNumberInSquareMatrix } from "../errors/different-cols-rows-number-square-matrix.error";

export class SquareMatrix extends Matrix {
  static determineMatrixSize(matrixLength: number) {
    const matrixSize = Math.sqrt(matrixLength);

    if (!Number.isInteger(matrixSize)) {
      throw new DifferentColumnsAndRowsNumberInSquareMatrix();
    }

    return matrixSize;
  }

  constructor(flatMatrix: MatrixElement[]) {
    try {
      const matrixSize = SquareMatrix.determineMatrixSize(flatMatrix.length);

      super(flatMatrix, matrixSize, matrixSize);
    } catch {
      super(flatMatrix, 0, 0, false);
    }
  }
}
