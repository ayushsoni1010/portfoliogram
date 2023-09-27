const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const url = "https://ayushsoni1010.com/";

  await page.goto(url);
  await page.screenshot({ path: "mywebsite.png" });
  await browser.close();
})();