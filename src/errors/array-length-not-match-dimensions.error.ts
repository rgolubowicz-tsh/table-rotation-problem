import { AppError } from "./app.error";

export class ArrayLengthNotMatchDimensionsError extends AppError {
  constructor() {
    super("Array length does not match dimensions");
  }
}
