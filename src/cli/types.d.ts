import { MatrixElement } from "../matrix/types";

export interface RawDataRowInput {
  id: string;
  json: string;
}

export interface DataRowInput {
  id: string;
  json: MatrixElement[];
}

export interface DataRowOutput {
  id: string;
  json: string;
  is_valid: string;
}

export interface TableRotationProblemCLIInterface {}
