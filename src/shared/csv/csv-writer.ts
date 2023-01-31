import { format } from "fast-csv";
import { formatterConfiguration } from "./consts/formatter-configuration.consts";

export const createCSVFormatterStream = (configuration = formatterConfiguration) => {
  return format(configuration);
};

export const createCSVWriteStream = (configuration = formatterConfiguration) => {
  return createCSVFormatterStream(configuration);
};
