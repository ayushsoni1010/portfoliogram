import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [website, setWebsite] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event: any) => {
    setWebsite(event.target.value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8000/api/ai/generate`,
        {
          prompt: website,
        }
      );
      console.log(response);
      setOutput(response.data.data);
      setError("");
    } catch (err) {
      setOutput("");
      setError("An error occurred while fetching data.");
    }
  };

  return (
    <div>
      <h1>Website Data Generator</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter website name"
          value={website}
          onChange={handleChange}
        />
        <button type="submit">Generate Data</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {output && (
        <div>
          <h2>GPT Prompt Output:</h2>
          <textarea
            style={{
              border: "1px solid #ccc",
              width: "100%",
              minHeight: "100px",
            }}
            value={output}
            readOnly
          />
        </div>
      )}
    </div>
  );
}

export default App;
