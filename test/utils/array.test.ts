import { moveInArray } from "../../src/content/utils/array"

describe("moveInArray", () => {
  const ARRAY = [0, 1, 2, 3, 4, 5]

  test("works for valid moves", () => {
    expect(moveInArray(ARRAY, 0, 2)).toEqual([1, 2, 0, 3, 4, 5])
    expect(moveInArray(ARRAY, 2, 4)).toEqual([0, 1, 3, 4, 2, 5])
    expect(moveInArray(ARRAY, 4, 2)).toEqual([0, 1, 4, 2, 3, 5])
  })

  test("works for no move", () => {
    expect(moveInArray(ARRAY, 0, 0)).toEqual(ARRAY)
    expect(moveInArray(ARRAY, 3, 3)).toEqual(ARRAY)
  })

  test("does not modify original array", () => {
    moveInArray(ARRAY, 1, 4)
    expect(ARRAY).toEqual(ARRAY)
  })

  test("throws error for invalid moves", () => {
    expect(() => moveInArray(ARRAY, -3, 4)).toThrow()
    expect(() => moveInArray(ARRAY, 2, ARRAY.length)).toThrow()
    expect(() => moveInArray(ARRAY, -1, ARRAY.length + 5)).toThrow()
    expect(() =>
      moveInArray(ARRAY, ARRAY.length + 5, ARRAY.length + 5),
    ).toThrow()
  })
})
