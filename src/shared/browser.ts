import Browser from "webextension-polyfill";

type Browser = "Chrome" | "Firefox" | "Other";

/**
 * Detects which browser the extension is running in
 */
export const getBrowser = (): Browser => {
  const browserUrl = Browser.runtime.getURL("/").toLowerCase();

  if (browserUrl.startsWith("chrome")) {
    return "Chrome";
  }
  if (browserUrl.startsWith("moz")) {
    return "Firefox";
  }
  console.error("Unknown browser detected");
  return "Other";
};
