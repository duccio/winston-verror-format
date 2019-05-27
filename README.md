# Winston@3 verror format

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
  transports: [new transports.Console()]
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
  transports: [new transports.Console()]
});

logger.error(new VError(new Error("Error #1"), "Unexpected error"));
```

## API

## verrorFormat(options)

### options

Configuration object.<br><br>Type: `VErrorFormatOptions`

### options.stack

Save full stack trace as meta `stack`.<br><br> Type: `boolean`<br> Default: `false`
