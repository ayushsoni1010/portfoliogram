import { getScrapedData } from "../services/scraperService";

const scraperController = {
  async scrapeData(request, response){
    try {
      const website = request?.query?.website;
      const data = await getScrapedData(website);
      return response.status(200).json(data);
    } catch (error) {
      console.error(`----> Error found: ${error}`);
      return response.status(500).json({ error: "Internal server error" });
    }
  },
};

export default scraperController;
