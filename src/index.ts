import { Format, TransformableInfo } from "logform"
import { LEVEL, MESSAGE } from "triple-beam"
import VError from "verror"

export interface VErrorFormatOptions {
  stack?: boolean
}

class VErrorFormat {
  public constructor(private opts: VErrorFormatOptions = {}) {}

  public transform(einfo: TransformableInfo): TransformableInfo {
    if (einfo instanceof Error) {
      const info = Object.assign({}, einfo, {
        level: einfo.level,
        [LEVEL]: einfo[LEVEL] || einfo.level,
        message: einfo.message,
        [MESSAGE]: einfo[MESSAGE] || einfo.message,
      })

      if (this.opts.stack) {
        info.stack = VError.fullStack(einfo)
      }

      return info
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const error: any = einfo.message
    if (!(error instanceof Error)) return einfo

    Object.assign(einfo, error)
    einfo.message = einfo[MESSAGE] = error.message

    if (this.opts.stack) {
      einfo.stack = VError.fullStack(error)
    }

    return einfo
  }
}

export const verrorFormat = (opts?: VErrorFormatOptions): Format => {
  return new VErrorFormat(opts)
}
