import { AppError } from "./app.error";

export class DifferentColumnsAndRowsNumberInSquareMatrix extends AppError {
  constructor() {
    super("Square matrix should have same number of rows and columns.");
  }
}
