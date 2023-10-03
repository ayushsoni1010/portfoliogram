import { errorResponse, successResponse } from "../utils/response.js";
import { generalGenie } from "../services/openaiService.js";

async function generateAnswers(request, response) {
  try {
    const { prompt } = request?.body;

    if (!prompt) {
      return errorResponse(
        response,
        "Please provide a prompt",
        "Please provide a prompt"
      );
    }

    const data = await generalGenie(request, response, prompt);
    return successResponse(response, "Answers generated:", data);
  } catch (error) {
    console.error(`Error: ${error}`);
    return errorResponse(
      response,
      "We ran into an error while generating",
      error
    );
  }
}

export { generateAnswers };
