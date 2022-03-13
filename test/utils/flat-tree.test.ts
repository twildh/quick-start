import { Bookmarks } from "webextension-polyfill";

import { flattenTree } from "../../src/content/utils/flat-tree";
import chromeFlatTree from "../test-resources/chrome-flat-tree";
import chromeTree from "../test-resources/chrome-tree";
import firefoxFlatTree from "../test-resources/firefox-flat-tree";
import firefoxTree from "../test-resources/firefox-tree";

describe("flattenTree", () => {
  test("flattens Chrome bookmark tree correctly", () => {
    const flattenedTree = flattenTree(chromeTree);
    expect(flattenedTree).toEqual(chromeFlatTree);
  });

  test("flattens Firefox bookmark tree correctly", () => {
    const flattenedTree = flattenTree(firefoxTree);
    expect(flattenedTree).toEqual(firefoxFlatTree);
  });

  test("throws error if multiple root nodes are provided", () => {
    const invalidTree = [{}, {}] as Bookmarks.BookmarkTreeNode[];
    expect(() => flattenTree(invalidTree)).toThrowError();
  });
});
