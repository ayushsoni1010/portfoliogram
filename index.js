const readline = require("readline");
const { generateJSONData } = require("./services/openai");
const { extractSkillsFromJSON } = require("./services/openai");
const { getScrapedData } = require("./services/scraper");

const read = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

read.question("Please enter website url: ", async (userInput) => {
  console.log(`User entered: ${userInput}`);

  try {
    const data = await getScrapedData("https://" + userInput);
    // console.log(data);

    const { site, name, email, mobile, location, links } = data;
    const newData = {
      site,
      name,
      email,
      mobile,
      location,
      links,
    };

    const formattedData = await generateJSONData([JSON.stringify(newData)]);
    console.log(formattedData);
    console.log(await extractSkillsFromJSON(data["text"]), 10000);
  } catch (error) {
    console.error("Error occurred:", error);
  } finally {
    read.close();
  }
});
