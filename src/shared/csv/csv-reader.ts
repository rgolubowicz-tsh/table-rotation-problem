import * as fs from "fs";
import { parse, ParserOptionsArgs } from "fast-csv";
import { parserConfiguration } from "./consts/parser-configuration.consts";

export const createCSVParserStream = (configuration: ParserOptionsArgs = parserConfiguration) => {
  return parse(configuration);
};

export const createCSVReadStream = (filePath: string, configuration?: ParserOptionsArgs) => {
  const csvParserStream = createCSVParserStream(configuration);

  return fs.createReadStream(filePath).pipe(csvParserStream);
};
