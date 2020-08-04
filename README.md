# Winston@3 verror format

[![Version npm](https://img.shields.io/npm/v/winston-verror-format.svg?style=flat-square)](https://www.npmjs.com/package/winston-verror-format)
[![npm Downloads](https://img.shields.io/npm/dm/winston-verror-format.svg?style=flat-square)](https://npmcharts.com/compare/winston-verror-format?minimal=true)
[![Dependencies](https://img.shields.io/david/duccio/winston-verror-format.svg?style=flat-square)](https://david-dm.org/duccio/winston-verror-format)
[![Build Status](https://img.shields.io/travis/duccio/winston-verror-format/master.svg?style=flat-square)](https://travis-ci.com/duccio/winston-verror-format)
[![Codecov](https://img.shields.io/codecov/c/github/duccio/winston-verror-format.svg)](https://codecov.io/github/duccio/winston-verror-format)
[![Known Vulnerabilities](https://snyk.io/test/github/duccio/winston-verror-format/badge.svg)](https://snyk.io/test/github/duccio/winston-verror-format)

Winston@3 [verror](https://github.com/joyent/node-verror) full stack trace, with all nested errors recursively reported as `caused by:` + `err.stack`.

## Install

```bash
npm install winston-verror-format
```

## Usage TypeScript

```typescript
import { createLogger, format, transports } from "winston";
import { verrorFormat } from "winston-verror-format";
import VError from "verror";

const logger = createLogger({
  format: format.combine(verrorFormat({ stack: true }), format.json()),
  transports: [new transports.Console()],
});

logger.error(new VError(new Error("Error #1"), "Unexpected error"));
```

## Usage JavaScript

```js
const { createLogger, format, transports } = require("winston");
const { verrorFormat } = require("winston-verror-format");
const VError = require("verror");

const logger = createLogger({
  format: format.combine(verrorFormat({ stack: true }), format.json()),
  transports: [new transports.Console()],
});

logger.error(new VError(new Error("Error #1"), "Unexpected error"));
```

## API

## verrorFormat(options)

### options

Configuration object.<br><br>Type: `VErrorFormatOptions`

### options.stack

Save full stack trace as meta `stack`.<br><br> Type: `boolean`<br> Default: `false`
