import { NodeId, TreeNode } from "../shared/types";

export interface ContextMenuInfo {
	x: number;
	y: number;
	isOpen: boolean;
	selectedNode?: TreeNode;
}

export type DialogType =
	| "none"
	| "create-bookmark"
	| "create-folder"
	| "edit-bookmark"
	| "edit-folder";

export interface DialogInfo {
	dialogType: DialogType;
	editedNode?: TreeNode;
	currentFolderId?: NodeId;
}
