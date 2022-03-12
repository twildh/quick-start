import React, { ReactElement, useEffect, useState } from "react"
import { useDispatch } from "react-redux"

import { getOptionsStorage } from "../../shared/options-storage"
import useDefaultFolderId from "../hooks/use-default-folder-id"
import { setCurrentFolderId } from "../store/action-creators"
import { refreshBookmarks } from "../store/thunks"
import { useSelector } from "../store/use-selector"
import { DialogInfo } from "../types"
import { isEmptyObject } from "../utils/object"
import styles from "./App.module.scss"
import Clock from "./elements/Clock"
import NodeDialog from "./elements/NodeDialog"
import Spinner from "./elements/Spinner"
import FolderView from "./structure/FolderView"
import Footer from "./structure/Footer"
import Header from "./structure/Header"

const optionsStorage = getOptionsStorage()

const App = (): ReactElement => {
  const dispatch = useDispatch()

  const bookmarks = useSelector((state) => state.bookmarks)
  const currentFolderId = useSelector((state) => state.currentFolderId)
  const [defaultFolderId, setDefaultFolderId] = useDefaultFolderId()
  const [showClock, setShowClock] = useState<boolean>()
  const [dialogInfo, setDialogInfo] = useState<DialogInfo>({
    dialogType: "none",
    editedNode: undefined,
    currentFolderId: undefined,
  })

  // After loading component: Update bookmark tree in state using browser API
  useEffect(() => {
    dispatch(refreshBookmarks())
  }, [])

  // After loading component: Load setting whether clock should be displayed
  useEffect(() => {
    optionsStorage.getAll().then((options) => setShowClock(options.showClock))
  }, [])

  // When default directory changes, navigate there
  useEffect(() => {
    if (defaultFolderId) {
      dispatch(setCurrentFolderId(defaultFolderId))
    }
  }, [defaultFolderId])

  let appContent
  if (
    defaultFolderId == null ||
    currentFolderId == null ||
    showClock == null ||
    isEmptyObject(bookmarks)
  ) {
    // Options or bookmarks have not yet loaded: Show loading spinner
    appContent = <Spinner />
  } else if (!(defaultFolderId in bookmarks)) {
    // If default folder does not exist: Show loading spinner and reset it to the first tree node
    console.error(
      "Default folder does not exist: Resetting it to first bookmark node",
    )
    const newDefaultFolderId = bookmarks[0].id
    setDefaultFolderId(newDefaultFolderId)
  } else if (!(currentFolderId in bookmarks)) {
    // If current folder does not exist: Show loading spinner and navigate to default directory
    console.error(
      "Current folder does not exist: Resetting it to default folder",
    )
    dispatch(setCurrentFolderId(defaultFolderId))
    appContent = <Spinner />
  } else {
    // Render bookmark tree
    const currentFolder = bookmarks[currentFolderId]
    appContent = (
      <>
        {showClock && <Clock />}
        <Header currentFolder={currentFolder} />
        <FolderView
          currentFolder={currentFolder}
          setDialogInfo={setDialogInfo}
        />
        <Footer currentFolder={currentFolder} setDialogInfo={setDialogInfo} />
        {dialogInfo.dialogType !== "none" && (
          <NodeDialog dialogInfo={dialogInfo} setDialogInfo={setDialogInfo} />
        )}
      </>
    )
  }

  return <div className={styles.app}>{appContent}</div>
}

export default App
