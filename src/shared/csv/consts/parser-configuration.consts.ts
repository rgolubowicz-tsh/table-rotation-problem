import { ParserOptions } from "csv-stream";

export const parserConfiguration: ParserOptions = {
  endLine: "\n",
  // eslint-disable-next-line @typescript-eslint/quotes
  escapeChar: '"',
  // eslint-disable-next-line @typescript-eslint/quotes
  enclosedChar: '"',
};
