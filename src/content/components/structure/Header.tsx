import React, { DragEvent, ReactElement } from "react"
import { useDispatch } from "react-redux"

import { TreeNode } from "../../../shared/types"
import BackIcon from "../../assets/icons/back.svg"
import {
  setCurrentFolderId,
  setDraggedNodeId,
} from "../../store/action-creators"
import { moveNodeToFolder } from "../../store/thunks"
import { useSelector } from "../../store/use-selector"
import styles from "./Header.module.scss"

interface Props {
  currentFolder: TreeNode
}

/**
 * Header component with title of current bookmark folder and back button
 */
const Header = (props: Props): ReactElement => {
  const { currentFolder } = props

  const dispatch = useDispatch()

  const bookmarks = useSelector((state) => state.bookmarks)
  const draggedNodeId = useSelector((state) => state.draggedNodeId)

  const currentFolderId = currentFolder.id
  const parentFolderId = currentFolderId
    ? bookmarks[currentFolderId].parentId
    : undefined
  const grandParentFolderId = parentFolderId
    ? bookmarks[parentFolderId].parentId
    : undefined

  // Node can be moved up if it wouldn't move it into the root directory
  const canMoveUp = grandParentFolderId != null

  const onBackClick = (): void => {
    if (currentFolder.parentId) {
      dispatch(setCurrentFolderId(currentFolder.parentId))
    } else {
      console.error("Cannot change into the parent directory: Does not exist")
    }
  }

  const onDrop = (
    event: DragEvent<HTMLAnchorElement | HTMLButtonElement>,
  ): void => {
    event.preventDefault()

    if (draggedNodeId && canMoveUp && parentFolderId) {
      dispatch(moveNodeToFolder(draggedNodeId, parentFolderId))
      dispatch(setDraggedNodeId(undefined))
    }
  }

  // Display back button when not in the root directory
  let backButton
  // `parentId` is `undefined` in root directory
  if (currentFolder.parentId) {
    backButton = (
      <button
        type="button"
        className={styles.backButton}
        onClick={onBackClick}
        onDragEnter={(event): void => event.preventDefault()}
        onDragOver={(event): void => event.preventDefault()}
        onDrop={onDrop}
      >
        <BackIcon className={styles.backIcon} />
      </button>
    )
  }

  return (
    <header className={styles.header}>
      {backButton}
      <h1>{currentFolder.title || "Bookmarks"}</h1>
    </header>
  )
}

export default Header
