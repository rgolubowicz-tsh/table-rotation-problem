import { FormatterOptionsArgs } from "fast-csv";

export const formatterConfiguration: FormatterOptionsArgs<any, any> = {
  headers: true,
  escape: "\n",
  delimiter: ",",
  // eslint-disable-next-line @typescript-eslint/quotes
  quote: '"',
  quoteHeaders: false,
};
