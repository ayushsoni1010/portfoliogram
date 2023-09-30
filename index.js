import readline from "readline";
import { generateJSONData, extractOtherData } from "./services/openai.js";
import { getScrapedData } from "./services/scraper.js";

const read = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

read.question("Please enter website url: ", async (userInput) => {
  console.log(`User entered: ${userInput}`);

  try {
    const url = "https://" + userInput;
    const data = await getScrapedData(url);

    const { site, name, email, mobile, location, links } = data;
    const newData = {
      site,
      name,
      email,
      mobile,
      location,
      links,
    };

    const formattedData = await generateJSONData(JSON.stringify(newData));
    console.log(formattedData, 101010);

    const otherData = await extractOtherData(data.text);
    console.log(otherData, 202020);
  } catch (error) {
    console.error("Error occurred:", error);
  } finally {
    read.close();
  }
});
