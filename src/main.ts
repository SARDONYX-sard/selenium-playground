import { getArizonaWeatherFromGoogle } from "./utils";

// sample
getArizonaWeatherFromGoogle({
  buildOptions: [
    "--headless",
    "--disable-gpu",
    // "--no-sandbox",
    `--window-size=1980,1200`,
  ],
}).catch((error: Error): void => {
  console.log(error.message);
  process.exit(1);
});
