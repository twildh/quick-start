import React, { ReactElement, useCallback, useEffect, useState } from "react"

import { FlatTree, TreeNode } from "../../../shared/types"
import useEventListener from "../../hooks/use-event-listener"
import { useSelector } from "../../store/use-selector"
import { ContextMenuInfo, DialogInfo } from "../../types"
import { moveInArray } from "../../utils/array"
import ContextMenu from "../elements/ContextMenu"
import Node from "../elements/Node"
import styles from "./FolderView.module.scss"

interface Props {
  currentFolder: TreeNode
  setDialogInfo: (dialogInfo: DialogInfo) => void
}

/**
 * Returns all child nodes of the current folder
 */
const getChildren = (
  bookmarks: FlatTree,
  currentFolder: TreeNode,
): TreeNode[] =>
  bookmarks[currentFolder.id].childrenIds.map((id) => bookmarks[id])

const FolderView = (props: Props): ReactElement => {
  const { currentFolder, setDialogInfo } = props

  const bookmarks = useSelector((state) => state.bookmarks)

  const [children, setChildren] = useState<TreeNode[]>(
    getChildren(bookmarks, currentFolder),
  )
  const [contextMenuInfo, setContextMenuInfo] = useState<ContextMenuInfo>({
    isOpen: false,
    x: 0,
    y: 0,
  })

  // Keep `children` state updated when `currentFolderId` prop or `bookmarks` state change
  useEffect(() => {
    setChildren(getChildren(bookmarks, currentFolder))
  }, [bookmarks, currentFolder])

  const updateContextMenu = useCallback(
    (isOpen: boolean, x: number, y: number, selectedNode?: TreeNode) => {
      setContextMenuInfo({ x, y, isOpen, selectedNode })
    },
    [],
  )

  useEventListener("click", () => updateContextMenu(false, 0, 0))
  useEventListener("contextmenu", () => updateContextMenu(false, 0, 0))

  const moveDndElement = (nodeId: string, newIndex: number): void => {
    const newChildren = [...children]
    const oldIndex = newChildren.findIndex((child) => child.id === nodeId)
    if (oldIndex !== newIndex) {
      setChildren(moveInArray(newChildren, oldIndex, newIndex))
    }
  }

  const folderView =
    children.length > 0 ? (
      <div className={styles.treeContainer}>
        {children.map((child, index) => (
          <Node
            key={child.id}
            node={child}
            index={index}
            moveDndElement={moveDndElement}
            updateContextMenu={updateContextMenu}
          />
        ))}
        <ContextMenu
          contextMenuInfo={contextMenuInfo}
          setDialogInfo={setDialogInfo}
        />
      </div>
    ) : (
      <p className={styles.folderEmptyLabel}>Folder is empty</p>
    )

  return <div className={styles.folderView}>{folderView}</div>
}

export default FolderView
