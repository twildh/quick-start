import { Dispatch, SetStateAction, useEffect, useState } from "react"

import { getOptionsStorage } from "../../shared/options-storage"

const optionsStorage = getOptionsStorage()

/**
 * Retrieves the default folder extension setting
 */
const loadDefaultFolderId = async (): Promise<string | undefined> => {
  const options = await optionsStorage.getAll()
  return options.defaultFolderId
}

/**
 * Updates the default folder extension setting
 */
const saveDefaultFolderId = async (
  defaultFolderId: string | undefined,
): Promise<void> => {
  await optionsStorage.set({ defaultFolderId })
}

/**
 * React state hook for the default folder option. Keeps the state in sync with the extension
 * preferences
 */
const useDefaultFolderId = (): [
  string | undefined,
  Dispatch<SetStateAction<string | undefined>>,
] => {
  const [defaultFolderId, setDefaultFolderId] = useState<string | undefined>()

  // After loading component: Use user's preferred root folder as current directory
  useEffect(() => {
    loadDefaultFolderId().then((folderId) => {
      setDefaultFolderId(folderId)
    })
  }, [])

  // Every time `defaultFolderId` is updated, make the same update in the extension preferences
  useEffect(() => {
    loadDefaultFolderId().then((storedDefaultFolderId) => {
      if (
        defaultFolderId != null &&
        storedDefaultFolderId !== defaultFolderId
      ) {
        saveDefaultFolderId(defaultFolderId)
      }
    })
  }, [defaultFolderId])

  return [defaultFolderId, setDefaultFolderId]
}

export default useDefaultFolderId
