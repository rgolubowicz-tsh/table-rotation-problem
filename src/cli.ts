import { TableRotationProblemCLI } from "./cli/cli";

const { program } = require("commander");

const cli = new TableRotationProblemCLI();

program
  .argument("<inputFilePath>", "path where the CSV file is stored")
  .action((inputFilePath: string) => {
    cli.rotateDataFromCSV(inputFilePath);
  })
  .parse(process.argv);
