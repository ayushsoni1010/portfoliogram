const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const scraperRoutes = require("./src/routes/scraperRoutes");
const openaiRoutes = require("./src/routes/openaiRoutes");
const { logRequestResponse } = require("./src/middlewares/index");
const { connectMongoDB } = require("./src/config/database");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const MONGO_URL = process.env.MONGO_URL;

// Mongoose Connection
// connectMongoDB(MONGO_URL);

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(logRequestResponse("logs/log.txt"));

// Routes
app.use("/api/web", scraperRoutes);
app.use("/api/ai", openaiRoutes);

app.get("/api", (_req, res) => {
  res.json({ message: "Hey there!" });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
