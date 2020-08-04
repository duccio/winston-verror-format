import { TransformableInfo } from "logform"
import { MESSAGE } from "triple-beam"
import VError from "verror"

import { verrorFormat } from "../src"

describe("verrorFormat", () => {
  const info = new VError(new Error("Error #1"), "Unexpected error")
  const out = verrorFormat().transform((info as unknown) as TransformableInfo)

  it("should contain composed error message", () => {
    expect((out as TransformableInfo)[MESSAGE]).toContain("Unexpected error: Error #1")
  })

  it("should contain meta with VError property jse_cause", () => {
    expect(out as TransformableInfo).toHaveProperty("jse_cause")
  })
})

describe("verrorFormat (with message as error)", () => {
  const info = {
    level: "info",
    message: new VError(new Error("Error #1"), "Unexpected error"),
  }
  const out = verrorFormat().transform((info as unknown) as TransformableInfo)

  it("should contain composed error message", () => {
    expect((out as TransformableInfo)[MESSAGE]).toContain("Unexpected error: Error #1")
  })

  it("should contain meta with VError property jse_cause", () => {
    expect(out as TransformableInfo).toHaveProperty("jse_cause")
  })
})

describe("verrorFormat (with stack)", () => {
  const info = new VError(new Error("Error #1"), "Unexpected error")
  const out = verrorFormat({ stack: true }).transform((info as unknown) as TransformableInfo)

  it("should contain stack", () => {
    expect(out as TransformableInfo).toHaveProperty("stack")
  })

  it("should contain full-stack", () => {
    expect((out as TransformableInfo)["stack"]).toContain("caused by:")
  })
})

describe("verrorFormat (with message as error and stack)", () => {
  const info = {
    level: "info",
    message: new VError(new Error("Error #1"), "Unexpected error"),
  }
  const out = verrorFormat({ stack: true }).transform((info as unknown) as TransformableInfo)

  it("should contain stack", () => {
    expect(out as TransformableInfo).toHaveProperty("stack")
  })

  it("should contain full-stack", () => {
    expect((out as TransformableInfo)["stack"]).toContain("caused by:")
  })
})

describe("verrorFormat (with normal message)", () => {
  const info = {
    level: "info",
    message: "127.0.0.1 - there's no place like home",
  }
  const out = verrorFormat().transform(info)

  it("should not change info", () => {
    expect(out).toMatchObject(info)
  })
})
