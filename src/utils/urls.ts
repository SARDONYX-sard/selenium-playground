import chalk from "chalk";
import moment from "moment";
import { By } from "selenium-webdriver";
// utils
import { build, execCommand, writeFiles } from ".";
import type { ScrapingContent, ScrapingFunc } from "../@types/urls";

export const default_urls = [
  "https://www.google.com/",
  "https://www.google.com/",
  "https://www.google.com/",
  "https://www.google.com/",
  "https://www.google.com/",
  "https://www.google.com/",
];

/**
 * Webサイトから情報を取得するための関数
 *
 * @param domain - 例: "google.com"
 * @param url - 例: "https://www.google.com/"
 * @param getElement1 - Webサイトの要素を手に入れる1つめの関数
 * @param getElement2 - Webサイトの要素を手に入れる2つめの関数
 * @param driver - 例: `const driver = build()`
 */
export const getUrlContent: ScrapingFunc<string, string> = async ({
  url = "https://www.google.com/",
  domain = "google.com",
  getElement1,
  getElement2,
  driver,
}) => {
  // isURL?
  if (RegExp(`^https?://.*${domain}.*`).test(url)) {
    try {
      // サイトのタイトルを取得
      const title = await driver.getTitle();

      // サイトの要素を手に入れる関数の結果1つ目
      const element1 = await getElement1(driver);

      // サイトの要素を手に入れる関数の結果2つ目
      const element2 = await getElement2(driver);

      // 結果を返します
      return chalk`
        サイトタイトル: {yellow ${title}}
        取れた要素1: {cyan ${element1}}
        取れた要素2: {green ${element2}}
        `;

      // Catch error
    } catch (e) {
      const error_log = chalk`{red ${url} の要素取得に失敗しました}`;
      console.log(error_log);
      console.log(e.message);
    }
  }
};

/**
 * google検索から、「アメリカ合衆国・アリゾナ州」の天気を取得し、ファイルに書き込んでくれるお試し関数
 *
 * @param url @default "https://www.google.com/search?q=arizona+weather&gl=us&hl=en&pws=0&gws_rd=cr"
 *
 * 他地域用のURLを取得するためのクエリ: アメリカの場合は URL + "&gl=us&hl=en&pws=0&gws_rd=cr"
 *
 * @param sleepMs 読み込み待機時間。単位：ミリ秒 - @default 5000
 * @param writeLogPath 書き込むファイルパス - @default `src/selenium/logs/${today}.txt`
 */
export const getArizonaWeatherFromGoogle = async ({
  url = "https://www.google.com/search?q=arizona+weather&gl=us&hl=en&pws=0&gws_rd=cr",
  sleepMs = 3000,
  writeLogPath = `src/logs/${moment().format("YYYY-MM-DD")}.txt`,
  buildOptions,
}: Partial<ScrapingContent> = {}): Promise<string | undefined> => {
  // setting
  const driver = build(buildOptions);

  try {
    // URLを開きます
    await driver.get(url);
    await driver.sleep(sleepMs);

    const log = await getUrlContent({
      url,
      // URLが指定したドメインに引っかかるかテストします
      domain: "google.com/search",

      // 1つめのHTML要素の取得関数を記述
      getElement1: async () => {
        // 今日の曜日 (例： Monday)
        const dow = await driver
          .findElement(
            By.xpath("/html/body/div[7]/div/div[9]/div[1]/div/div[2]/div[2]/div/div/div[1]/div/div/div/div[2]/span/div[2]"),
          )
          .getText();
        const today = moment().format("YYYY-MM-DD"); // 日付 (ex.2021-6-23)
        return `本日の日付: ${today} ${dow}`;
      },

      // 2つめのHTML要素の取得関数を記述
      getElement2: async () => {
        // 気温: °C(例： 27)
        const celsius = await driver.findElement(By.id("wob_tm")).getText();
        // 降水確率: (例： 60%)
        const pp = await driver.findElement(By.id("wob_pp")).getText();
        // 天気：(例： Light rain showers)
        const weather = await driver.findElement(By.id("wob_dc")).getText();

        return `
                  気温: ${celsius}°C
                  降水確率: ${pp}
                  天気: ${weather}
              `;
      },

      driver,
    });

    if (log) {
      console.log(
        chalk`{green ---------------- 結果 -------------------}
            ${log}`,
      );

      // 結果が取れているかどうか
      // 取れていたらファイルに書き込みます
      await writeFiles(writeLogPath, log);
      return log;
    }

    // 取れずに終わったとき
    console.error(chalk`{red 値が取得できませんでした。取得した値は ${log} です}`);

    // エラー処理
  } catch (error) {
    console.error(error);
    throw new Error("googleサイトからデータ取得に失敗しました");

    // エラーまたは正常終了で実行される
  } finally {
    await driver.quit();
    execCommand("pause");
  }
};
