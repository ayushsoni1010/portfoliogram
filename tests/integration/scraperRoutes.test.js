const express = require("express");
const {
  handleScrapeData,
} = require("../../src/controllers/scraperController.js");
const router = require("../../src/routes/scraperRoutes.js");

const app = express();
app.use(express.json());

// Mock response object
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

// jest.mock(mockResponse);

// jest.mock("../src/controllers/scraperController.js", () => ({
//   handleScrapeData: jest.fn(),
// }));

// jest.mock(handleScrapeData);

describe("Scraper Routes", () => {
  it("should return a welcome message for GET /", async () => {
    await router.get("/", (req, res) => {
      expect(req.status).toBe(200);
      expect(res.json).toBeHaveBeenCalledWith({
        message: "Welcome to Open AI API",
      });
    });
  });

  it("should handle a successful POST request with a valid prompt", async () => {
    const requestBody = { prompt: "Valid prompt" };
    const responseData = { data: "Generated data" };

    jest.mock("../../src/controllers/scraperController.js", () => ({
      handleScrapeData: jest.fn().mockResolvedValueOnce(responseData),
    }));

    const response = await request(app).post("/generate").send(requestBody);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(responseData);
  });

  it("shoudl handle a successful POST /generate", async () => {
    const req = { body: { prompt: "Valid Prompt" } };
    const res = mockResponse();

    if (!req.body.prompt) {
      expect(req.body.prompt).toBeHaveBeenCalledWith({
        message: "Please enter the prompt to generate data",
      });
    }

    // await router.post("/generate", req, res);

    // expect(res.status).toBe(200);
    // expect(res.json).toHaveBeenCalledWith({
    //   success: true,
    //   message: "Website successfully scraped",
    //   data: { mockResponse: { data } },
    // });
  });
});

describe("Scraper Routes", () => {
  //   it("should return a welcome message for GET /", async () => {
  //     await router.get("/", (req, res) => {
  //       expect(res.status).toHaveBeenCalledWith(200);
  //       expect(res.json).toHaveBeenCalledWith({
  //         message: "Welcome to OpenAI API",
  //       });
  //     });
  //   });
  //   it("should handle a successful POST request to /generate", async () => {
  //     const req = { body: { prompt: "Valid prompt" } };
  //     const res = mockResponse();
  //     await router.post("/generate", req, res);
  //     expect(res.status).toHaveBeenCalledWith(200);
  //     // Add more expectations for the response as needed
  //   });
  //   it("should handle a POST request to /generate with missing prompt", async () => {
  //     const req = { body: {} }; // Missing 'prompt'
  //     const res = mockResponse();
  //     await router.post("/generate", req, res);
  //     expect(res.status).toHaveBeenCalledWith(400);
  //     expect(res.json).toHaveBeenCalledWith({
  //       message: "Please enter the prompt to generate data",
  //     });
  //   });
});
