import { AppError } from "./app.error";

export class CannotParseJsonError extends AppError {
  constructor() {
    super("Cannot parse provided JSON");
  }
}
