import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import { Input, Button } from "@material-tailwind/react";
import { helpers } from "./helpers";

function App() {
  console.log(helpers.apiURL);
  const [website, setWebsite] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event: any) => {
    setWebsite(event.target.value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${helpers.apiURL}/api/web/generate`, {
        prompt: website,
      });

      setOutput(JSON.stringify(response.data.data, null, 2));
      setError("");
    } catch (err) {
      setOutput("");
      setError("An error occurred while fetching data.");
    } finally {
      setIsLoading(false); // Set loading state to false when done
    }
  };

  const formattedOutput = output.replace(/\n/g, "<br>");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 ">
      <div className="py-12 px-16 bg-zinc-100 rounded-lg shadow-lg flex flex-col w-[900px]">
        <h1 className="text-4xl font-sans font-medium text-gray-800">
          Generate Your Data Today. 🚀
        </h1>
        <div className="text-slate-800 mt-2 mb-12 font-sans font-normal">
          An organized and curated collection of scraped data, showcasing data
          acquisition and organization skills.
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center">
            <Input
              type="text"
              label="Enter your website"
              value={website}
              onChange={handleChange}
              className="w-full py-4 px-4 rounded-l-lg border border-gray-400 focus:border-black text-gray-700"
              containerProps={{
                className: "min-w-0",
              }}
              crossOrigin={undefined}
            />
            <Button
              size="sm"
              disabled={!website || isLoading} // Disable button when loading
              className="px-4 py-4 -mt-6 rounded-r-lg ml-2 bg-slate-950 text-white hover:bg-slate-800 hover:cursor-pointer overscroll-x-none flex-shrink-0"
              type="submit"
            >
              {isLoading ? "Loading..." : "Generate"}
            </Button>
          </div>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {output && (
          <div className="mt-4">
            <h2 className="text-lg font-medium text-gray-800">
              GPT Prompt Output:
            </h2>
            <div
              className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-700 focus:outline-none whitespace-pre-wrap overflow-scroll"
              style={{ maxHeight: "300px" }}
              dangerouslySetInnerHTML={{ __html: formattedOutput }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
