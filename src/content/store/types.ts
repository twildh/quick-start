import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

import { FlatTree, NodeId } from "../../shared/types";

// State

export interface State {
	bookmarks: FlatTree;
	currentFolderId: NodeId | undefined;
	draggedNodeId: NodeId | undefined;
	folderHoverTimeout: { id: string; timer: number } | undefined;
}

// Action types

export const SET_BOOKMARKS = "SET_BOOKMARKS";
export const SET_CURRENT_FOLDER_ID = "SET_CURRENT_FOLDER_ID";
export const SET_DRAGGED_NODE_ID = "SET_DRAGGED_NODE_ID";
export const SET_FOLDER_HOVER_TIMER = "SET_FOLDER_HOVER_TIMER";

// Actions

export interface SetBookmarksAction extends Action {
	type: typeof SET_BOOKMARKS;
	payload: {
		bookmarks: FlatTree;
	};
}

export interface SetCurrentFolderIdAction extends Action {
	type: typeof SET_CURRENT_FOLDER_ID;
	payload: {
		currentFolderId: NodeId;
	};
}

export interface SetDraggedNodeIdAction extends Action {
	type: typeof SET_DRAGGED_NODE_ID;
	payload: {
		draggedNodeId: NodeId | undefined;
	};
}

export interface SetFolderHoverTimerAction extends Action {
	type: typeof SET_FOLDER_HOVER_TIMER;
	payload: {
		timeout: { id: NodeId; timer: number } | undefined;
	};
}

export type ActionT =
	| SetBookmarksAction
	| SetCurrentFolderIdAction
	| SetDraggedNodeIdAction
	| SetFolderHoverTimerAction;

// Thunks

export type ThunkActionT = ThunkAction<void, State, void, Action>;
