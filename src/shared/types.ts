import { Bookmarks } from "webextension-polyfill-ts";

// Flattened bookmark tree (allows faster access and navigation)

export type NodeId = string;

export interface TreeNode {
	id: string;
	parentId: NodeId | undefined;
	childrenIds: NodeId[];
	index: number | undefined;
	type: Bookmarks.BookmarkTreeNodeType | undefined;
	title: string;
	url: string | undefined;
}

export type FlatTree = Record<NodeId, TreeNode>;
