const { createLogger, format, transports, log } = require("winston");
const winston = require("winston/lib/winston/config");
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
  format: combine(timestamp(), myFormat),
  transports: [
    new transports.File({ filename: "./logs/server.log" }),
    // new transports.Console(),
  ],
  exitOnError: false,
});

module.exports = logger;
