import openai from "../config/openai.js";
import { errorResponse } from "../utils/response.js";

async function askGenie(type, data) {
  if (!data) {
    return "";
  }

  const prompts = {
    personal: `Select a real person from the provided data ${data} and suggest their designation that matches their skills. Remove duplicate email addresses and add location and mobile number from the data. Create a JSON object in the following format:
      {
        "name": "[Person's Name]",
        "designation": "[Suggested Designation]",
        "emails": ["[Unique Email 1]", "[Unique Email 2]", ...],
        "mobile_number": "[Extracted Mobile Number]",
        "location": "[Extracted Location]"
      }
    `,
    links: `
    Please extract and organize the distinct URLs for social media profiles (e.g., LinkedIn, Twitter, GitHub, Instagram) from the provided data (${data}). Arrange all the URLs and remove all the duplicates urls in the following JSON format:
      {
        "links": {
          "linkedin": "[LinkedIn Profile URL]",
          "twitter": "[Twitter Profile URL]",
          "github": "[GitHub Profile URL, no repository URL]",
          "instagram": "[Instagram URL]",
          "other": {
            // Add all additional URLs that don't fit the above categories
            "[LABEL]": "[URL]"
          }
        }
      }
    `,
    core: `Shorten the text under 3000 characters and list out only data including only software skills, and only core-competencies from ${data} as a third person perspective. The JSON format should include only the 'skills' and 'core_competencies' properties:

      {
        "skills": ["SKILL1, SKILL2, ..., SKILLn"],
        "core_competencies": ["COMPETENCY1, COMPETENCY2, ..., COMPETENCYn"]
      }
    `,
  };

  try {
    const response = await openai.completions.create({
      model: "text-davinci-003",
      prompt: prompts[type] ? prompts[type] : data,
      max_tokens: 1000,
      temperature: 0.3,
      top_p: 0.1,
    });

    // Extract the data from the response
    const data = response?.choices[0]?.text;
    return data;
  } catch (error) {
    console.log("Error", error);
  }
}

async function generalGenie(_request, response, prompt) {
  if (!prompt) {
    return errorResponse(response, "Please provide a valid prompt");
  }

  try {
    const response = await openai.completions.create({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 500,
      temperature: 0.3,
      top_p: 0.1,
    });

    // Extract the data from the response
    const data = response?.choices[0]?.text;
    return data;
  } catch (error) {
    console.log("Error", error);
    return errorResponse(response, error);
  }
}

export { askGenie, generalGenie };
