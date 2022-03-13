import Browser from "webextension-polyfill";

import { getBrowser } from "../../shared/browser";
import { flattenTree } from "../utils/flat-tree";
import { setBookmarks } from "./action-creators";
import { ThunkActionT } from "./types";

export const refreshBookmarks =
  (): ThunkActionT =>
  async (dispatch): Promise<void> => {
    const tree = await Browser.bookmarks.getTree();
    const flatTree = flattenTree(tree);
    dispatch(setBookmarks(flatTree));
  };

export const createBookmark =
  (
    parentId: string,
    title: string,
    url: string,
    index?: number,
  ): ThunkActionT =>
  async (dispatch): Promise<void> => {
    await Browser.bookmarks.create({ parentId, title, url, index });
    dispatch(refreshBookmarks());
  };

export const createFolder =
  (parentId: string, title: string, index?: number): ThunkActionT =>
  async (dispatch): Promise<void> => {
    await Browser.bookmarks.create({ parentId, title, index });
    dispatch(refreshBookmarks());
  };

export const deleteBookmark =
  (id: string): ThunkActionT =>
  async (dispatch): Promise<void> => {
    await Browser.bookmarks.remove(id);
    dispatch(refreshBookmarks());
  };

export const deleteFolder =
  (id: string): ThunkActionT =>
  async (dispatch): Promise<void> => {
    await Browser.bookmarks.removeTree(id);
    dispatch(refreshBookmarks());
  };

export const updateBookmark =
  (id: string, title?: string, url?: string): ThunkActionT =>
  async (dispatch): Promise<void> => {
    if (!title && !url) {
      throw Error(
        "Error updating bookmark: One of `title` and `url` parameters must be provided",
      );
    }
    await Browser.bookmarks.update(id, { title, url });
    dispatch(refreshBookmarks());
  };

export const updateFolder = (id: string, title: string): ThunkActionT =>
  updateBookmark(id, title);

export const moveNodeToFolder =
  (id: string, parentId: string): ThunkActionT =>
  async (dispatch): Promise<void> => {
    await Browser.bookmarks.move(id, { parentId });
    dispatch(refreshBookmarks());
  };

export const moveNodeInFolder =
  (id: string, index: number): ThunkActionT =>
  async (dispatch, getState): Promise<void> => {
    const oldIndex = getState().bookmarks[id].index;
    let newIndex = index;
    if (getBrowser() === "Chrome" && oldIndex != null && newIndex > oldIndex) {
      // Workaround for Chromium bug: When a bookmark is moved to a position with a higher index, the
      // final location is off by one (one index lower than expected)
      // TODO: Remove once https://bugs.chromium.org/p/chromium/issues/detail?id=1053959 is fixed
      newIndex += 1;
    }
    await Browser.bookmarks.move(id, { index: newIndex });
    dispatch(refreshBookmarks());
  };
