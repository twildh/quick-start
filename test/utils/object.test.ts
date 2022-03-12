import { isEmptyObject } from "../../src/content/utils/object"

describe("isEmptyObject", () => {
  test("returns `true` for `{}`", () => {
    expect(isEmptyObject({})).toBeTruthy()
  })

  test("returns `false` for anything else", () => {
    expect(isEmptyObject({ hello: "world" })).toBeFalsy()
    expect(isEmptyObject({ hello: {} })).toBeFalsy()
    expect(isEmptyObject([])).toBeFalsy()
    expect(isEmptyObject(["hello", "world"])).toBeFalsy()
  })
})
