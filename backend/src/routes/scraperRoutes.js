import express from "express";
import scraperController from "../controllers/scraperController";

const router = express.Router();

router.get("/", async (_request, response) => {
  return response.send("Welcome to Portfolio-Pulse API");
});

router.get("/scrape", async (request, response) => {
  try {
    const website = request?.body?.website;

    if (!website) {
      response.json({ message: "Please enter the website url: " });
    }

    const data = scraperController.scrapeData(website, response);
    response.json(data);
  } catch (error) {
    console.error(`----> Error found: ${error}`);
    response
      .status(500)
      .json({ error: "An error occured while scraping data." });
  }
});

export default router;
