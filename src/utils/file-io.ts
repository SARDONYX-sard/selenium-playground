import { mkdir, writeFile } from "fs/promises";
// import { promises as fsp } from "fs"; // Node.js 10.17 ~ 12をお使いの場合 (fsp.writeFileのように使います)
import chalk from "chalk";

/**
 * 文字列、文字列の配列をファイルに書き込む関数
 * @param path - 書き込みたいファイル名
 * @example `./src/${moment().format("YYYY-MM-DD")}.txt`
 * @param contents - 書き込む内容
 */
export const writeFiles = async (path: string, contents: string | string[]): Promise<void> => {
  try {
    // ディレクトリが存在しない場合、作成します
    const dir_path = path.replace(/(?:[^/]+?)??$/, "");
    await mkdir(dir_path, { recursive: true });

    // ファイルへ書き込み
    await writeFile(path, stripAnsi(`${contents}`));
    console.log(chalk`{green 書き込みに成功しました}`);
    return;

    // error catch
  } catch (error) {
    console.log(chalk`{red 書き込みに失敗しました}\n${error}`);
    throw error;
  }
};

/**
 * chalkで付けたカラーコードを削除する関数
 * @param text
 */
export const stripAnsi = (text: string): string =>
  text.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, "");
