import { exec } from "child_process";

/**
 * ターミナルのコマンドを実行する関数
 * @param command - 実行するコマンド名
 * @param args - option: コマンド実行のトリガーとなる引数
 *
 * @example:pauseコマンドを実行する
 * // 1. main.tsの中で
 * execCommand("pause", /[^(-{1})](-{2})?pause/);
 *
 * // 2. ターミナルにて以下のコマンドを実行
 * npx ts-node src/main.ts --pause
 * //または
 * npx ts-node src/main.ts pause
 */
export const execCommand = (command: string, arg: string | RegExp = command): void => {
  // arg引数が文字列だったらこちらの処理を行う
  if (typeof arg === "string" && arg === process.argv[2]) return execute(command);

  // arg引数が正規表現だったらこちら
  if (arg == RegExp(arg) && arg.test(process.argv[2])) return execute(command);
};

/**
 * シェルコマンドを実行する関数
 * @param command 実行したいコマンド
 */
export const execute = (command: string): void => {
  exec(command, (error) => console.error(`[ERROR] ${error}`));
};
