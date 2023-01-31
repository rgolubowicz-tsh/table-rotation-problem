import winston from "winston";
import { Logger } from "./types";

const logFormat = winston.format.printf(({ level, message, meta }) => {
  const stack = meta && meta.stack ? meta.stack : undefined;

  return JSON.stringify({
    "@timestamp": new Date().toISOString(),
    "@version": 1,
    environment: process.env.NODE_ENV,
    message,
    stack,
    severity: level,
    type: "stdin",
  });
});

export const winstonLogger: Logger = winston.createLogger({
  level: process.env.LOGGING_LEVEL || "debug",
  format: winston.format.combine(winston.format.splat(), logFormat),
  transports: [new winston.transports.File({ filename: "error.log" })],
});
