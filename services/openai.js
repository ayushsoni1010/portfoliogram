const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function generateJSONData(prompt) {
  try {
    const response = await openai.completions.create({
      model: "text-davinci-003",
      prompt: `Select one name of a person which could be an individual from any country and a real existing person, and suggest the designation of the person using the below data and Please organize the URLs of a specific individual in a JSON format, making sure to eliminate any duplicates. Only display the unique URLs for Instagram, LinkedIn, Twitter, and GitHub, and be sure to categorize them based on their respective social platforms. For GitHub, please provide a link to the user profile rather than a repository. Please ensure that the URL values align with their appropriate social platforms, such as using only "instagram.com" for links under Instagram. Additionally, any other urls mentioned should be placed in the "other: []" object from ${prompt}`,
      max_tokens: 256,
    });
    const data = response.choices[0].text;
    return data;
  } catch (error) {
    console.log("Error", error);
  }
}

module.exports = { openai, generateJSONData };
