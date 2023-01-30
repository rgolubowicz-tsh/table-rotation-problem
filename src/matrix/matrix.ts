import chunk from "lodash.chunk";

import { IMatrix, MatrixElement } from "./types";
import { RingNumberOutOfRangeError } from "../errors/ring-number-out-of-range.error";
import { winstonLogger } from "../shared/logger";

export class Matrix implements IMatrix {
  public isValid: boolean = true;
  public matrix: MatrixElement[][];
  public rows = 0;
  public columns = 0;

  constructor(flatMatrix: MatrixElement[], rows: number, columns: number, isValid = true) {
    this.rows = rows;
    this.columns = columns;

    const totalElements = rows * columns;

    if (totalElements === 0 || totalElements !== flatMatrix.length || !isValid) {
      this.isValid = false;
      this.matrix = [];

      winstonLogger.error("Matrix that has been provided is not valid");

      return;
    }

    this.matrix = Matrix.flatMatrixToDimensional(flatMatrix, columns);
  }

  get ringsNumber() {
    const ringsByRows = Math.floor(this.rows / 2);
    const ringsByColumns = Math.floor(this.columns / 2);

    return Math.min(ringsByRows, ringsByColumns);
  }

  rotateRingRight(ringNumber: number): void {
    if (!this.isValid) {
      return;
    }

    if (ringNumber > this.ringsNumber) {
      throw new RingNumberOutOfRangeError(ringNumber);
    }

    const tempMatrix = this.copyMatrix();
    let firstRowIndex = ringNumber - 1;
    const lastRowIndex = firstRowIndex + this.rows - 2 * (ringNumber - 1);
    const firstColumnIndex = ringNumber - 1;
    const lastColumnIndex = firstColumnIndex + this.columns - 2 * (ringNumber - 1);

    if (firstRowIndex + 1 > lastRowIndex || firstColumnIndex + 1 > lastColumnIndex) {
      return;
    }

    // Grab the first elements of next matrix row
    // It'll be copied to the new matrix as the first element
    let previous = this.matrix[firstRowIndex + 1][firstColumnIndex];

    // Copy first row of the matrix ring to the temporary matrix
    for (let i = firstColumnIndex; i < lastColumnIndex; i++) {
      const current = this.matrix[firstRowIndex][i];
      tempMatrix[firstRowIndex][i] = previous;
      previous = current;
    }

    // First row is covered
    // Increase the row number indicator
    firstRowIndex = firstRowIndex + 1;

    // Copy last column of the matrix ring to the temporary matrix
    for (let i = firstRowIndex; i < lastRowIndex; i++) {
      const current = this.matrix[i][lastColumnIndex - 1];
      tempMatrix[i][lastColumnIndex - 1] = previous;
      previous = current;
    }

    // Copy last column of the matrix ring to the temporary matrix
    for (let i = lastColumnIndex - 2; i >= firstColumnIndex; i--) {
      const current = this.matrix[lastRowIndex - 1][i];
      tempMatrix[lastRowIndex - 1][i] = previous;
      previous = current;
    }

    // Copy first column of the matrix ring to the temporary matrix
    for (let i = lastRowIndex - 2; i >= firstRowIndex; i--) {
      const current = this.matrix[i][firstColumnIndex];
      tempMatrix[i][firstColumnIndex] = previous;
      previous = current;
    }

    this.matrix = tempMatrix;
  }

  rotateAllRings() {
    for (let i = 1; i <= this.ringsNumber; i++) {
      this.rotateRingRight(i);
    }
  }

  get flatten() {
    return this.matrix.flatMap((array) => array);
  }

  private copyMatrix() {
    return this.matrix.map(function (array) {
      return array.slice();
    });
  }

  static flatMatrixToDimensional(flatMatrix: MatrixElement[], columns: number): MatrixElement[][] {
    return chunk(flatMatrix, columns);
  }
}
