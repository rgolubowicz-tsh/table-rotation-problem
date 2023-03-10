import { Matrix } from "../matrix";
import { MatrixElement } from "../matrix/types";
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
    const matrixSize = SquareMatrix.determineMatrixSize(flatMatrix.length);

    super(flatMatrix, matrixSize, matrixSize);
  }
}
