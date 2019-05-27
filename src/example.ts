import { createLogger, format, transports } from "winston"
import { verrorFormat } from "./index"
import VError from "verror"

const logger = createLogger({
  format: format.combine(verrorFormat({ stack: true }), format.json()),
  transports: [new transports.Console()]
})

logger.error(new VError(new Error("Error #1"), "Unexpected error"))
