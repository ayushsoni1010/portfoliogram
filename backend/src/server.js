import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import scraperRoutes from "./routes/scraperRoutes.js";
import openaiRoutes from "./routes/openaiRoutes.js";
import { logRequestResponse } from "./middlewares/index.js";
import { connectMongoDB } from "./config/connection.js";

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
app.use(logRequestResponse("log.txt"));

// Routes
app.use("/api/web", scraperRoutes);
app.use("/api/ai", openaiRoutes);

app.get("/", (_req, res) => {
  res.json({ message: "Hey there!" });
});

console.log("Hey, TypeScript here :)");

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
