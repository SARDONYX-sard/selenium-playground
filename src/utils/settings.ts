import "chromedriver";
import { Builder, ThenableWebDriver } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";
// utils
import "./error-handle";

/**
 * @param options
 * @example
 * const driver = build([
 *  "--headless", // ブラウザを不可視状態のバックグラウンド実行。
 *   "--disable-gpu", // ヘッドレスモードでの実行の際に必要なオプション (じきに不要に。)
 *   "--disable-extensions", // 拡張機能の無効化
 *   "--no-sandbox",
 *   `--window-size=1980,1200`,
 * ]);
 */
export const build = (options: string[] = []): ThenableWebDriver => {
  const chromeOptions = new chrome.Options().addArguments(...options);

  return new Builder().setChromeOptions(chromeOptions).forBrowser("chrome").build();
};
