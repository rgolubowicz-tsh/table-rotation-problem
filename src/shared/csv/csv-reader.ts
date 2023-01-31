import * as fs from "fs";
import csv, { ParserOptions } from "csv-stream";
import { parserConfiguration } from "./consts/parser-configuration.consts";

export const createCSVParserStream = (configuration: ParserOptions = parserConfiguration) => {
  return csv.createStream(configuration);
};

export const createCSVReadStream = (filePath: string, configuration?: ParserOptions) => {
  const csvParserStream = createCSVParserStream(configuration);

  return fs.createReadStream(filePath).pipe(csvParserStream);
};
