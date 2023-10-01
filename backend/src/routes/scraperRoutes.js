import express from "express";
import { handleScrapeData } from "../controllers/scraperController.js";
import { errorResponse, successResponse } from "../utils/response.js";

const router = express.Router();

router.get("/", async (_request, response) => {
  return successResponse(response, "Welcome to Portfolio-Pulse API");
});

router.get("/generate", async (request, response) => {
  try {
    const website = request?.query?.website;

    if (!website) {
      errorResponseResponse(response, "Please enter the website url: ");
    }

    return await handleScrapeData(request, response);
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
