import { browser } from "webextension-polyfill-ts";

import { createTestBookmarks } from "./test-bookmarks";

/**
 * In development mode, create sample bookmarks for testing after installing the extension
 */
if (process.env.NODE_ENV === "development") {
	browser.runtime.onInstalled.addListener(async () => {
		await createTestBookmarks();
	});
}
