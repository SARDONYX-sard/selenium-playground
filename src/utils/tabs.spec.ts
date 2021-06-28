import { ThenableWebDriver } from "selenium-webdriver";

import { build, createNewTab, switchNewTab } from ".";

let driver: ThenableWebDriver;
describe("tabs", () => {
  context("when it works fine", () => {
    beforeAll(() => {
      driver = build(["--headless", "--disable-gpu", "--window-size=1024,768"]);
    });

    afterAll(async () => await driver.quit());

    it("should be able to create and switch tabs", async () => {
      try {
        const url = "https://www.google.com/";
        // URLを開きます
        await driver.get(url);

        // 新規タブを作成
        await createNewTab(url, driver);

        // 先ほど作ったタブに切り替えます
        await switchNewTab(0, driver);

        // 現在フォーカスが当たっているタブのサイトタイトルを取得します
        const title = await driver.getTitle();

        // 取得したタイトルは、"Google"という文字列かどうか？
        expect(title).toBe("Google");
      } catch (e) {
        return expect(e).toMatch("error");
      }
    }, 30000);
  });
});
