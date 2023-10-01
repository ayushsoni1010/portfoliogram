import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { logRequestResponse } from "./middlewares/index.js";
import { connectMongoDB } from "./config/index.js";

import readline from "readline";
import { askGenie } from "./services/openaiService.js";
import { getScrapedData } from "./services/scraperService.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGO_URL;

// Mongoose Connection
// connectMongoDB(MONGO_URL);

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use(logRequestResponse("log.txt"));

// Routes
// app.use("/api", scraperRoutes);
// app.use("/api", openaiRoutes);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

console.log("Hey, TypeScript here :)");

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

const read = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

read.question("Please enter website URL: ", async (userInput) => {
  try {
    const websiteUrl = "https://" + userInput;

    const scrapedData = await getScrapedData(websiteUrl);

    const { website, title, name, email, mobile, location } = scrapedData;

    const personalInfo = { website, title, name, email, mobile, location };

    const personalJSON = await askGenie(
      "personal",
      JSON.stringify(personalInfo)
    );
    const linksJSON = await askGenie("links", scrapedData.links);
    const coreJSON = await askGenie("core", scrapedData.text);

    // Parse the JSON
    const parsedPersonalInfo = JSON.parse(extractJSONContent(personalJSON));
    const parsedLinks = JSON.parse(extractJSONContent(linksJSON));
    const parsedCore = JSON.parse(extractJSONContent(coreJSON));

    const genieAnswer = {
      website,
      title,
      name: parsedPersonalInfo?.name,
      designation: parsedPersonalInfo?.designation,
      email: parsedPersonalInfo?.emails,
      mobile_number: parsedPersonalInfo?.mobile_number,
      location: parsedPersonalInfo?.location,
      links: parsedLinks?.links,
      skills: parsedCore?.skills,
      core_competencies: parsedCore?.core_competencies,
    };

    console.log(genieAnswer);
  } catch (error) {
    console.error("Error occurred:", error);
  } finally {
    read.close();
  }
});

function extractJSONContent(jsonString) {
  const startIndex = jsonString.indexOf("{");
  const endIndex = jsonString.lastIndexOf("}");
  const jsonContent = jsonString.substring(startIndex, endIndex + 1);
  return jsonContent;
}
