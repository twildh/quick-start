import OptionsSync from "webext-options-sync"

import { getBrowser } from "./browser"

/**
 * Returns the ID of the directory which is used as the default bookmark root. Because different
 * browsers have different (immutable) default directories, these cases must be handled separately
 */
const getDefaultFolderId = (): string => {
  const browserName = getBrowser()
  // Firefox: "Bookmarks Menu" folder
  if (browserName === "Firefox") {
    return "menu________"
  }
  // Chrome: "Bookmarks Bar" folder
  // Also returned for other browsers (likely based on Chromium)
  if (browserName !== "Chrome") {
    console.error("Default bookmarks folder not known for the current browser")
  }
  return "1"
}

// Default values for options
const defaults = {
  defaultFolderId: getDefaultFolderId(),
  showClock: false,
}

/**
 * Configuration for extension options (e.g. defines default values)
 * Can be imported by both content and background scripts
 */
export const getOptionsStorage = (): OptionsSync<typeof defaults> =>
  new OptionsSync({
    defaults,
  })
