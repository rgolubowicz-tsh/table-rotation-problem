import { AppError } from "./app.error";

export class RingNumberOutOfRangeError extends AppError {
  constructor(ringNumber: number) {
    super(`Provided ring number (${ringNumber}) is out of range`);
  }
}
