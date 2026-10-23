import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";
import apiRoutes from "./routes/api.js";
import { errorHandler } from "./middleware/validate.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST", "PATCH", "DELETE"]
  })
);
app.use(express.json({ limit: "2mb" }));
app.use(morgan("dev"));

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    service: "Riyadvi Software Technologies API",
    databaseConnected: mongoose.connection.readyState === 1,
    timestamp: new Date().toISOString()
  });
});

// Mount core API routes
app.use("/api", apiRoutes);

// Centralized error handling middleware
app.use(errorHandler);

async function startServer() {
  if (process.env.MONGODB_URI) {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("✅ Connected to MongoDB database");
    } catch (err) {
      console.warn("⚠️ MongoDB connection failed, running with in-memory fallback store:", err.message);
    }
  } else {
    console.log("ℹ️ No MONGODB_URI found in .env — running with ready-to-test in-memory fallback store");
  }

  app.listen(PORT, () => {
    console.log(`🚀 Riyadvi Backend API listening on http://localhost:${PORT}`);
  });
}

startServer();
