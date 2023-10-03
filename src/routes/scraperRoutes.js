const express = require("express");
const { handleScrapeData } = require("../controllers/scraperController.js");
const { successResponse, errorResponse } = require("../utils/response.js");

const router = express.Router();

router.get("/", async (_request, response) => {
  return successResponse(response, "Welcome to OpenAI API");
});

router.post("/generate", async (request, response) => {
  try {
    const prompt = request?.body?.prompt;

    if (!prompt) {
      return errorResponse(
        response,
        "Please enter the prompt to generate data"
      );
    }

    return await handleScrapeData(request, response);
  } catch (error) {
    console.error(`Error: ${error}`);
    errorResponse(response, "An error occurred while generating data.", error);
  }
});

module.exports = router;
