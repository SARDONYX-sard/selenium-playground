import { ThenableWebDriver } from "selenium-webdriver";

/**
 *  タブを新規作成する関数
 * @param url - URLを文字列で入れる
 * @param driver - buildしたdriverを入れる
 */
export const createNewTab = async (url: string, driver: ThenableWebDriver): Promise<void> => {
  try {
    await driver.executeScript("window.open(arguments[0], '_blank')", url);
  } catch (error) {
    console.error(error);
    throw new Error("新規タブ作成に失敗しました");
  }
};

/**
 * タブを切り替える関数
 * @param count -  切り替えたいタブは何番目かを入れる
 * @param driver - buildしたdriverを入れる
 */
export const switchNewTab = async (count: number, driver: ThenableWebDriver): Promise<void> => {
  try {
    const tabs = await driver.getAllWindowHandles();
    await driver.switchTo().window(tabs[count + 1]);
  } catch (error) {
    console.error(error);
    throw new Error("タブの切り替えに失敗しました");
  }
};
