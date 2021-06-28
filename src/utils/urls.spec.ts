import { promises as fsp } from "fs";
import moment from "moment";
// utils
import { getArizonaWeatherFromGoogle } from "./urls";

describe("getArizonaWeatherFromGoogle", () => {
  it("should be able to get the date", async () => {
    // テストに必要な情報を作成します
    const today = moment().format("YYYY-MM-DD");
    const path = `src/test/${today}-test.txt`;
    const dir = path.replace(/(?:[^\\/]+?)?$/, "");
    try {
      // テストしたい関数の実行
      const log = await getArizonaWeatherFromGoogle({
        writeLogPath: `src/test/${today}-test.txt`,
      });
      //"タイトル（何かの文字）取れた要素１（何かの文字）取れた要素2（何かの文字）"として文字列がとれたかどうか？
      return expect(log).toMatch(/タイトル:[\s\S]*取れた要素1:[\s\S]*取れた要素2:/g);

      // catch error
    } catch (e) {
      return expect(e).toMatch("error");

      // テスト時に作成したファイルの削除
    } finally {
      await fsp.unlink(path);
      await fsp.rmdir(dir);
    }
  }, 30000);
});
