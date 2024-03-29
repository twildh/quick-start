import { Bookmarks } from "webextension-polyfill";

const chromeTree: Bookmarks.BookmarkTreeNode[] = [
	{
		children: [
			{
				children: [
					{
						dateAdded: 1579026803387,
						id: "5",
						index: 0,
						parentId: "1",
						title: "Facebook",
						url: "https://facebook.com/",
					},
					{
						dateAdded: 1579026803387,
						id: "6",
						index: 1,
						parentId: "1",
						title: "GitHub",
						url: "https://github.com/",
					},
					{
						dateAdded: 1579026803388,
						id: "7",
						index: 2,
						parentId: "1",
						title: "Google",
						url: "https://google.com/",
					},
					{
						dateAdded: 1579026803388,
						id: "8",
						index: 3,
						parentId: "1",
						title: "LinkedIn",
						url: "https://linkedin.com/",
					},
					{
						dateAdded: 1579026803389,
						id: "9",
						index: 4,
						parentId: "1",
						title: "Netflix",
						url: "https://netflix.com/",
					},
					{
						dateAdded: 1579026803389,
						id: "10",
						index: 5,
						parentId: "1",
						title: "Twitter",
						url: "https://twitter.com/",
					},
					{
						dateAdded: 1579026803390,
						id: "11",
						index: 6,
						parentId: "1",
						title: "Wikipedia bookmark with a very, very, very, very, very long title",
						url: "https://wikipedia.org/",
					},
					{
						dateAdded: 1579026803391,
						id: "12",
						index: 7,
						parentId: "1",
						title: "Hacker News",
						url: "https://news.ycombinator.com/",
					},
					{
						dateAdded: 1579026803391,
						id: "13",
						index: 8,
						parentId: "1",
						title: "Reddit: Programming",
						url: "https://www.reddit.com/r/programming",
					},
					{
						dateAdded: 1579026803392,
						id: "14",
						index: 9,
						parentId: "1",
						title: "Doesn't exist",
						url: "https://476055346.com/",
					},
					{
						children: [
							{
								dateAdded: 1579026803394,
								id: "16",
								index: 0,
								parentId: "15",
								title: "Facebook",
								url: "https://facebook.com/",
							},
							{
								dateAdded: 1579026803394,
								id: "17",
								index: 1,
								parentId: "15",
								title: "GitHub",
								url: "https://github.com/",
							},
							{
								dateAdded: 1579026803394,
								id: "18",
								index: 2,
								parentId: "15",
								title: "Google",
								url: "https://google.com/",
							},
							{
								dateAdded: 1579026803394,
								id: "19",
								index: 3,
								parentId: "15",
								title: "LinkedIn",
								url: "https://linkedin.com/",
							},
							{
								dateAdded: 1579026803394,
								id: "20",
								index: 4,
								parentId: "15",
								title: "Netflix",
								url: "https://netflix.com/",
							},
							{
								dateAdded: 1579026803394,
								id: "21",
								index: 5,
								parentId: "15",
								title: "Twitter",
								url: "https://twitter.com/",
							},
							{
								dateAdded: 1579026803395,
								id: "22",
								index: 6,
								parentId: "15",
								title: "Wikipedia bookmark with a very, very, very, very, very long title",
								url: "https://wikipedia.org/",
							},
							{
								dateAdded: 1579026803395,
								id: "23",
								index: 7,
								parentId: "15",
								title: "Hacker News",
								url: "https://news.ycombinator.com/",
							},
							{
								dateAdded: 1579026803395,
								id: "24",
								index: 8,
								parentId: "15",
								title: "Reddit: Programming",
								url: "https://www.reddit.com/r/programming",
							},
							{
								dateAdded: 1579026803395,
								id: "25",
								index: 9,
								parentId: "15",
								title: "Doesn't exist",
								url: "https://476055346.com/",
							},
						],
						dateAdded: 1579026803393,
						dateGroupModified: 1579026803395,
						id: "15",
						index: 10,
						parentId: "1",
						title: "Some folder",
					},
				],
				dateAdded: 1579026802614,
				dateGroupModified: 1579026803393,
				id: "1",
				index: 0,
				parentId: "0",
				title: "Bookmarks Bar",
			},
			{
				children: [],
				dateAdded: 1579026802614,
				id: "2",
				index: 1,
				parentId: "0",
				title: "Other Bookmarks",
			},
		],
		dateAdded: 1579026802614,
		id: "0",
		title: "",
	},
];

export default chromeTree;
