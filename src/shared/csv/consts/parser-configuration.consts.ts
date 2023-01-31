import { ParserOptionsArgs } from "fast-csv";

export const parserConfiguration: ParserOptionsArgs = {
  headers: true,
  escape: "\n",
  delimiter: ",",
  ignoreEmpty: true,
};
