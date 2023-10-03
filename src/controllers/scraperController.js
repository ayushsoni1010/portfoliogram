import { getScrapedData } from "../services/scraperService.js";
import { askGenie } from "../services/openaiService.js";
import { extractJSONContent } from "../helpers/index.js";
import { successResponse, errorResponse } from "../utils/response.js";

async function handleScrapeData(request, response) {
  try {
    const userInput = request?.query?.website;

    if (!userInput) {
      successResponse(response, "Please enter the website url: ");
    }

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

    const data = {
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

    console.log(data);
    return successResponse(response, "Website successfully scraped", data);
  } catch (error) {
    console.error(`Error: ${error}`);
    return errorResponse(response, "Internal server error", error);
  }
}

export { handleScrapeData };
