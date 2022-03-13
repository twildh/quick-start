import { Bookmarks } from "webextension-polyfill"

import { FlatTree } from "../../shared/types"

interface BookmarkTreeNodeWithIndex extends Bookmarks.BookmarkTreeNode {
  index: number
}

/**
 * Type guard for asserting whether a tree node's index field is defined
 */
function nodeHasIndex(
  node: Bookmarks.BookmarkTreeNode,
): node is BookmarkTreeNodeWithIndex {
  return node.index != null
}

/**
 * Flattens the provided bookmark tree into an object (without nesting). Bookmarks and folders are
 * accessible by their IDs in constant time
 */
export function flattenTree(tree: Bookmarks.BookmarkTreeNode[]): FlatTree {
  const flatTree: FlatTree = {}

  function flattenChildren(node: Bookmarks.BookmarkTreeNode): void {
    const { id, parentId, children, index, title, url } = node

    let type: Bookmarks.BookmarkTreeNodeType
    if (node.type) {
      // Firefox: Node contains "type" property
      type = node.type
    } else {
      // Chrome: Type needs to be determined based on the existence of a "children" key
      type = children == null ? "bookmark" : "folder"
    }

    flatTree[id] = {
      id,
      parentId,
      childrenIds: (children ?? [])
        .filter(nodeHasIndex)
        .sort((a, b) => a.index - b.index)
        .map((child) => child.id),
      index,
      type,
      title,
      url,
    }

    // Recurse over children
    if (node.children) {
      for (const child of node.children) {
        flattenChildren(child)
      }
    }
  }

  if (tree.length !== 1) {
    throw Error("Provided bookmark tree should have a single root node")
  }

  flattenChildren(tree[0])
  return flatTree
}
