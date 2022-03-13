import { getIconUrl } from "../../src/content/utils/icon";

describe("getIconUrl", () => {
	test("returns correct URL for root URL", () => {
		expect(getIconUrl("https://google.com")).toEqual(
			"https://quick-start.samuelmeuli.com/icon?url=google.com&size=64..256..256&fallback_icon_color=969696",
		);
	});

	test("returns correct URL for subdirectory URL", () => {
		expect(getIconUrl("https://github.com/github/fetch")).toEqual(
			"https://quick-start.samuelmeuli.com/icon?url=github.com&size=64..256..256&fallback_icon_color=969696",
		);
	});
});
