import { expect } from "chai";
import { Matrix } from "./matrix";
import { MatrixElement } from "./types";

const flattenMatrix = {
  "2x2": [1, 2, 3, 4],
  "3x3": [1, 2, 3, 4, 5, 6, 7, 8, 9],
  "4x4": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
};

describe("Matrix class", () => {
  describe("Matrix creation", () => {
    it("should transform flattened matrix to the dimensional matrix", () => {
      const input = [1, 2, 3, 4];
      const expected: MatrixElement[][] = [
        [1, 2],
        [3, 4],
      ];

      const result = Matrix.flatMatrixToDimensional(input, 2);

      expect(result).deep.equal(expected);
    });

    it("should create a new valid matrix object", () => {
      const input = [1, 2, 3, 4];
      const expected: MatrixElement[][] = [
        [1, 2],
        [3, 4],
      ];

      const matrix = new Matrix(input, 2, 2);

      expect(matrix.isValid).to.be.true;
      expect(matrix.matrix).deep.equal(expected);
    });

    it("should create a new invalid matrix object", () => {
      const input = [1, 2, 3, 4, 5];

      const matrix = new Matrix(input, 2, 2);

      expect(matrix.isValid).to.be.false;
      expect(matrix.matrix).deep.equal([]);
    });
  });

  describe("Matrix ring rotation", () => {
    it("should rotate 1st ring to the right by 1 position - matrix 2 x 2", () => {
      const input = flattenMatrix["2x2"];
      const expected = [
        [3, 1],
        [4, 2],
      ];
      const matrix = new Matrix(input, 2, 2);

      matrix.rotateRingRight(1);

      expect(matrix.matrix).deep.equal(expected);
    });

    it("should rotate 1st ring to the right by 1 position - matrix 3 x 3", () => {
      const input = flattenMatrix["3x3"];
      const expected = [4, 1, 2, 7, 5, 3, 8, 9, 6];
      const matrix = new Matrix(input, 3, 3);

      matrix.rotateRingRight(1);

      expect(matrix.flatten).deep.equal(expected);
    });

    it("should rotate 1st ring to the right by 1 position - matrix 4 x 4", () => {
      const input = flattenMatrix["4x4"];
      const expected = [5, 1, 2, 3, 9, 6, 7, 4, 13, 10, 11, 8, 14, 15, 16, 12];
      const matrix = new Matrix(input, 4, 4);

      matrix.rotateRingRight(1);

      expect(matrix.flatten).deep.equal(expected);
    });

    it("should rotate 2nd ring to the right by 1 position - matrix 4 x 4", () => {
      const input = flattenMatrix["4x4"];
      const expected = [1, 2, 3, 4, 5, 10, 6, 8, 9, 11, 7, 12, 13, 14, 15, 16];
      const matrix = new Matrix(input, 4, 4);

      matrix.rotateRingRight(2);

      expect(matrix.flatten).deep.equal(expected);
    });

    it("shouldn't rotate - ring number exceed max", () => {
      const input = flattenMatrix["4x4"];
      const matrix = new Matrix(input, 4, 4);

      expect(() => matrix.rotateRingRight(3)).to.throw();
    });

    it("should rotate all rings to the right by 1 position - matrix 2x2", () => {
      const input = flattenMatrix["2x2"];
      const expected = [3, 1, 4, 2];
      const matrix = new Matrix(input, 2, 2);

      matrix.rotateAllRings();

      expect(matrix.flatten).deep.equal(expected);
    });

    it("should rotate all rings to the right by 1 position - matrix 4x4", () => {
      const input = flattenMatrix["4x4"];
      const expected = [5, 1, 2, 3, 9, 10, 6, 4, 13, 11, 7, 8, 14, 15, 16, 12];
      const matrix = new Matrix(input, 4, 4);

      matrix.rotateAllRings();

      expect(matrix.flatten).deep.equal(expected);
    });
  });
});
