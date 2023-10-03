import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import scraperRoutes from "./src/routes/scraperRoutes.js";
import openaiRoutes from "./src/routes/openaiRoutes.js";
import { logRequestResponse } from "./src/middlewares/index.js";
import { connectMongoDB } from "./src/config/database.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
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

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("frontend/build"));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
//   });
// }

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
