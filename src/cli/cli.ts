import { CsvFormatterStream } from "fast-csv";
import { createCSVReadStream } from "../shared/csv/csv-reader";
import { RawDataRowInput, DataRowOutput, DataRowInput } from "./types";
import { SquareMatrix } from "../square-matrix";
import { createCSVWriteStream } from "../shared/csv/csv-writer";
import { MatrixElement } from "../matrix/types";
import { formatterConfiguration } from "../shared/csv/consts/formatter-configuration.consts";
import { winstonLogger } from "../shared/logger";
import {
  ArrayLengthNotMatchDimensionsError,
  CannotParseJsonError,
  DifferentColumnsAndRowsNumberInSquareMatrix,
} from "../errors";
import { parserConfiguration } from "../shared/csv/consts/parser-configuration.consts";

export class TableRotationProblemCLI {
  private writeStream: CsvFormatterStream<RawDataRowInput, DataRowOutput>;

  isHeaderRow(line: any): boolean {
    return !!line.id?.startsWith("id") && !!line.json?.startsWith("json");
  }

  private prepareWriteStream(configuration: typeof formatterConfiguration) {
    this.writeStream = createCSVWriteStream(configuration);
    this.writeStream.pipe(process.stdout);
  }

  rotateDataFromCSV(inputFilePath: string) {
    this.prepareWriteStream({
      ...formatterConfiguration,
      quoteColumns: [false, true, false],
    });

    createCSVReadStream(inputFilePath, { ...parserConfiguration, columns: ["id", "json"] })
      .on("error", (error: unknown) => this.handleError(error))
      .on("data", (data: RawDataRowInput) => this.handleDataRow(data))
      .on("end", () => this.cleanup());
  }

  private handleDataRow(row: RawDataRowInput) {
    if (this.isHeaderRow(row)) {
      return;
    }

    try {
      const dataRow = this.parseRawDataInput(row);

      const rotatedMatrix = this.transformSingleMatrix(dataRow.json);

      this.writeData(row.id, rotatedMatrix, true);
    } catch (error) {
      if (
        error instanceof ArrayLengthNotMatchDimensionsError ||
        error instanceof DifferentColumnsAndRowsNumberInSquareMatrix
      ) {
        this.writeData(row.id, [], false);

        return;
      }

      this.handleError(error);
    }
  }

  private transformSingleMatrix(flatMatrix: MatrixElement[]) {
    const matrix = new SquareMatrix(flatMatrix);

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
  }

  private handleError(error: unknown) {
    this.cleanup();
    winstonLogger.error("Cannot process input", error);
  }
}
