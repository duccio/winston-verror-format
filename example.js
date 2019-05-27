/* eslint-disable @typescript-eslint/no-var-requires */
const { createLogger, format, transports } = require("winston")
const { verrorFormat } = require("./dist/index")
const VError = require("verror")

const logger = createLogger({
  format: format.combine(verrorFormat({ stack: true }), format.json()),
  transports: [new transports.Console()]
})

logger.error(new VError(new Error("Error #1"), "Unexpected error"))
