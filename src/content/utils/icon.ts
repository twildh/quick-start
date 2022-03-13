const API_BASE_URL = "https://quick-start.samuelmeuli.com/icon";
const FALLBACK_COLOR = "969696";
const MIN_ICON_SIZE = 64;
const MAX_ICON_SIZE = 256;

export function getIconUrl(url: string): string {
	// Determine base URL of favicon site
	const baseUrl = new URL(url).hostname;

	// Build request URL for favicon
	const iconUrl = new URL(API_BASE_URL);
	iconUrl.searchParams.append("url", baseUrl);
	iconUrl.searchParams.append("size", `${MIN_ICON_SIZE}..${MAX_ICON_SIZE}..${MAX_ICON_SIZE}`);
	iconUrl.searchParams.append("fallback_icon_color", FALLBACK_COLOR);
	return iconUrl.toString();
}
