import { expect } from "chai";
import { SquareMatrix } from "./square-matrix";

const flattenMatrix = {
  "2x2": [1, 2, 3, 4],
  "4x4": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
};

describe("Square Matrix class", () => {
  it("should create matrix 2x2", () => {
    const matrix = new SquareMatrix(flattenMatrix["2x2"]);

    expect(matrix.isValid).to.be.true;
    expect(matrix.rows).to.equal(2);
    expect(matrix.columns).to.equal(2);
  });

  it("should create matrix 4x4", () => {
    const matrix = new SquareMatrix(flattenMatrix["4x4"]);

    expect(matrix.isValid).to.be.true;
    expect(matrix.rows).to.equal(4);
    expect(matrix.columns).to.equal(4);
  });

  it("should create invalid matrix - not square", () => {
    const matrix = new SquareMatrix([1, 2, 3]);

    expect(matrix.isValid).to.be.false;
    expect(matrix.rows).to.equal(0);
    expect(matrix.columns).to.equal(0);
  });
});
