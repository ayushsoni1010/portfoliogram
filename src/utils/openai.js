import OpenAI from "openai";
import * as dotenv from "dotenv";
dotenv.config();

// Initialize openai object with the API key
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function generateJSONData(prompt) {
  try {
    const response = await openai.completions.create({
      model: "text-davinci-003",
      prompt: `Select a real person and suggest their designation that matches their skill from ${prompt}. Organize their unique URLs for Instagram, LinkedIn, Twitter, and GitHub in this JSON format:
      {
        "siteURL": "",
        "name": "[Person's Name]",
        "designation": "[Given Designation]",
        "emails": [],
        "mobile_number": "",
        "location": "",
        "links": {
          "linkedin": "[LinkedIn Profie URL]",
          "twitter": "[Twitter Profile URL]",
          "github": "[GitHub Profile URL, no repo url]",
          "instagram": "[Instagram URL]",
          "other_links": {
          }
        }
      }
      `,
      max_tokens: 1000,
      temperature: 0.4,
      top_p: 0.3,
    });

    // Extract the data from the response
    const data = response?.choices[0]?.text;
    return data;
  } catch (error) {
    console.log("Error", error);
  }
}

async function extractOtherData(prompt) {
  try {
    const response = await openai.completions.create({
      model: "text-davinci-003",
      prompt: `shorten the text under 3000 characters + list out only data including only software skills, and evaluation metrics of only core-competencies from ${prompt} in the JSON format as a third person perspective like below format:
      {
        "skills": "SKILL1, SKILL2",
        "core-competencies": ""
      }
      `,
      max_tokens: 500,
      temperature: 0.2,
      top_p: 0.1,
    });

    // Extract the data from the response
    const data = response?.choices[0]?.text;
    return data;
  } catch (error) {
    console.log("Error", error);
  }
}

export { openai, generateJSONData, extractOtherData };
