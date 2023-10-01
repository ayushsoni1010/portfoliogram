import express from "express";
import scraperController from "../controllers/scraperController";

const router = express.Router();

router.get("/openai", async (_request, response) => {
  return response.send("Welcome to OpenAI API");
});

router.post("/generate", async (request, response) => {
  try {
    const prompt = request?.body?.prompt;

    if (!prompt) {
      response.json({ message: "Please enter the prompt to generate data" });
    }

    const data = scraperController.scrapeData(prompt, response);
    response.json(data);
  } catch (error) {
    console.error(`----> Error found: ${error}`);
    response
      .status(500)
      .json({ error: "An error occured while generating scraped data." });
  }
});

export default router;
