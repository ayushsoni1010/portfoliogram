const { generateJSONData } = require("./services/openai");
const { getScrapedData } = require("./services/scraper");

(async () => {
  const data = await getScrapedData("https://ayushsoni1010.com");
  // const formattedData = await generateJSONData(JSON.stringify(data));

  console.log(data);
  // console.log(formattedData);
})();
