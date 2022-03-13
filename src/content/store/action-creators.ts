import { FlatTree, NodeId } from "../../shared/types";
import {
  SET_BOOKMARKS,
  SET_CURRENT_FOLDER_ID,
  SET_DRAGGED_NODE_ID,
  SetBookmarksAction,
  SetCurrentFolderIdAction,
  SetDraggedNodeIdAction,
  SET_FOLDER_HOVER_TIMER,
  SetFolderHoverTimerAction,
} from "./types";

export function setBookmarks(bookmarks: FlatTree): SetBookmarksAction {
  return {
    type: SET_BOOKMARKS,
    payload: {
      bookmarks,
    },
  };
}

export function setCurrentFolderId(
  currentFolderId: NodeId,
): SetCurrentFolderIdAction {
  return {
    type: SET_CURRENT_FOLDER_ID,
    payload: {
      currentFolderId,
    },
  };
}

export function setDraggedNodeId(
  draggedNodeId: NodeId | undefined,
): SetDraggedNodeIdAction {
  return {
    type: SET_DRAGGED_NODE_ID,
    payload: {
      draggedNodeId,
    },
  };
}

export function setFolderHoverTimer(timeout?: {
  id: NodeId;
  timer: number;
}): SetFolderHoverTimerAction {
  return {
    type: SET_FOLDER_HOVER_TIMER,
    payload: {
      timeout,
    },
  };
}
