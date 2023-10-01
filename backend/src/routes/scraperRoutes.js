import express from "express";
import { handleScrapeData } from "../controllers/scraperController.js";
import { errorResponse, successResponse } from "../utils/response.js";

const router = express.Router();

router.get("/", async (_request, response) => {
  return successResponse(response, "Welcome to Portfolio-Pulse API");
});

router.get("/scrape", async (request, response) => {
  try {
    const website = request?.query?.website;

    if (!website) {
      response.json({ message: "Please enter the website url: " });
    }
    return handleScrapeData(request, response);
  } catch (error) {
    console.error(`Error: ${error}`);
    return errorResponse(
      response,
      "An error occured while scraping data.",
      error
    );
  }
});

export default router;
