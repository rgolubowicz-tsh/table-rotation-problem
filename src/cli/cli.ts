import { createCSVReadStream } from "../shared/csv/csv-reader";
import { CsvParserStream, CsvFormatterStream } from "fast-csv";
import { RawDataRowInput, DataRowOutput, DataRowInput } from "./types";
import { SquareMatrix } from "../square-matrix/square-matrix";
import { createCSVWriteStream } from "../shared/csv/csv-writer";
import { MatrixElement } from "../matrix/types";
import { formatterConfiguration } from "../shared/csv/consts/formatter-configuration.consts";
import { winstonLogger } from "../shared/logger";
import { CannotParseJsonError } from "../errors/cannot-parse-json.error";

export class TableRotationProblemCLI {
  private readStream: CsvParserStream<RawDataRowInput, DataRowOutput>;

  private writeStream: CsvFormatterStream<RawDataRowInput, DataRowOutput>;

  constructor() {}

  rotateDataFromCSV(inputFilePath: string) {
    this.writeStream = createCSVWriteStream({
      ...formatterConfiguration,
      quoteColumns: [false, true, false],
    });
    this.writeStream.pipe(process.stdout);

    this.readStream = createCSVReadStream(inputFilePath)
      .on("error", (error) => this.handleError(error))
      .on("data", (data) => this.handleDataRow(data))
      .on("end", () => this.cleanup());
  }

  private handleDataRow(row: RawDataRowInput) {
    try {
      const dataRow = this.parseRawDataInput(row);

      const rotatedMatrix = this.transformSingleMatrix(dataRow.json);

      if (rotatedMatrix) {
        this.writeData(row.id, rotatedMatrix, true);
      } else {
        this.writeData(row.id, [], false);
      }
    } catch (error) {
      this.handleError(error);
    }
  }

  private transformSingleMatrix(flatMatrix: MatrixElement[]) {
    const matrix = new SquareMatrix(flatMatrix);

    if (!matrix.isValid) {
      return null;
    }

    matrix.rotateAllRings();

    return matrix.flatten;
  }

  private writeData(id: string, matrix: MatrixElement[], isValid: boolean) {
    if (!this.writeStream) return;

    const json = JSON.stringify(matrix).replace(/,/g, ", ");

    this.writeStream.write({ id, json, is_valid: isValid });
  }

  private parseRawDataInput(raw: RawDataRowInput): DataRowInput {
    try {
      return {
        ...raw,
        json: JSON.parse(raw.json),
      };
    } catch {
      throw new CannotParseJsonError();
    }
  }

  private cleanup() {
    this.writeStream?.end();
    this.readStream?.end();
  }

  private handleError(error: unknown) {
    this.cleanup();
    winstonLogger.error("Cannot process input", error);
  }
}
