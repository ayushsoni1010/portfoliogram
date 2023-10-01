import OpenAI from "openai";
import * as dotenv from "dotenv";
dotenv.config();

// Initialize openai object with the API key
const openai = new OpenAI({ apiKey: process.env.OPEN_AI_KEY });

export default openai;
