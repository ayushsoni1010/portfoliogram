const OpenAI = require("openai");
const dotenv = require("dotenv");
dotenv.config();

// Initialize openai object with the API key
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

module.exports = openai;
