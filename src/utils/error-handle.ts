import chalk from "chalk";

process.on("unhandledRejection", (error, promise) => {
  console.error(chalk`Error: {red ERR!} ${error}`);
  console.error(chalk`promise: {red ERR!} ${promise}`);
  process.exit(1); // exitコード1はエラーが起きて終了、０は正常に終了
});
