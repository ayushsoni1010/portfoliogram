import express from "express";
import { generateAnswers } from "../controllers/openaiController.js";
import { successResponse, errorResponse } from "../utils/response.js";

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

    return await generateAnswers(request, response);
  } catch (error) {
    console.error(`Error: ${error}`);
    errorResponse(response, "An error occured while generating data.", error);
  }
});

export default router;
