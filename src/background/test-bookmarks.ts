import { Bookmarks, browser } from "webextension-polyfill-ts";

interface TestBookmark {
	title: string;
	url: string;
}

// Sample bookmarks for testing the extension
const randomInt = Math.floor(Math.random() * 1000000000);
const testBookmarks: TestBookmark[] = [
	{ title: "Facebook", url: "https://facebook.com" },
	{ title: "GitHub", url: "https://github.com" },
	{ title: "Google", url: "https://google.com" },
	{ title: "LinkedIn", url: "https://linkedin.com" },
	{ title: "Netflix", url: "https://netflix.com" },
	{ title: "Twitter", url: "https://twitter.com" },

	// Long title
	{
		title: "Wikipedia bookmark with a very, very, very, very, very long title",
		url: "https://wikipedia.org",
	},

	// Trailing slash
	{ title: "Hacker News", url: "https://news.ycombinator.com/" },

	// Subpath
	{ title: "Reddit: Programming", url: "https://www.reddit.com/r/programming" },

	// Non-existent site
	{ title: "Doesn't exist", url: `https://${randomInt}.com` },
];

/**
 * Returns the ID of the first bookmark folder (Chrome and Firefox have bookmark folders which are
 * installed by default and cannot be deleted, so there is no need to create one)
 */
function getTestRootId(bookmarks: Bookmarks.BookmarkTreeNode[]): string {
	if (bookmarks.length === 0) {
		throw Error("Default bookmark folders missing");
	}
	if (!bookmarks[0].children || bookmarks[0].children.length === 0) {
		throw Error("First default bookmark folder is invalid (possibly not a folder)");
	}
	return bookmarks[0].children[0].id;
}

/**
 * Creates a set of sample bookmarks in the specified bookmark folder
 */
function fillFolderWithTestBookmarks(parentId: string): void {
	testBookmarks.forEach(async ({ title, url }) => {
		await browser.bookmarks.create({ parentId, title, url });
	});
}

/**
 * Creates sample bookmarks for testing
 */
export async function createTestBookmarks(): Promise<void> {
	const bookmarks = await browser.bookmarks.getTree();
	const rootId = getTestRootId(bookmarks);

	// Create bookmarks in first default folder
	fillFolderWithTestBookmarks(rootId);

	// Create nested folder and add more bookmarks in there
	const { id: folderId } = await browser.bookmarks.create({
		parentId: rootId,
		title: "Some folder",
	});
	fillFolderWithTestBookmarks(folderId);
}
