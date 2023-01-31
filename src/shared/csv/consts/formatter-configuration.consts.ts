import { FormatterOptionsArgs } from "fast-csv";

export const formatterConfiguration: FormatterOptionsArgs<any, any> = {
  headers: true,
  escape: "\n",
  delimiter: ",",
  quote: '"',
  quoteHeaders: false,
};
