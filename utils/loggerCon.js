import { config } from "../config/config.js";
import log4js from "log4js";

log4js.configure({
  appenders: {
    console: { type: "console" },
    warnFile: { type: "file", filename: "./utils/log/warn.log" },
    errorFile: { type: "file", filename: "./utils/log/error.log" },

    loggerConsole: {
      type: "logLevelFilter",
      appender: "console",
      level: "info",
    },
    loggerDebug: {
      type: "logLevelFilter",
      appender: "warnFile",
      level: "warn",
    },
    loggerError: {
      type: "logLevelFilter",
      appender: "errorFile",
      level: "error",
    },
  },
  categories: {
    default: {
      appenders: ["loggerConsole"],
      level: "all",
    },
    production: {
      appenders: ["loggerError", "loggerDebug", "loggerConsole"],
      level: "all",
    },
  },
});

let logger = null;

if (config.env === "production") {
  logger = log4js.getLogger("production");
} else {
  logger = log4js.getLogger();
}

export { logger };
