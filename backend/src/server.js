import dns from "node:dns";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";
import apiRoutes, { ensureInitialContentSeeded } from "./routes/api.js";
import { errorHandler } from "./middleware/validate.js";

// Resolve MongoDB Atlas SRV records cleanly across all local ISPs and cloud containers
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch {
  // use system default if restricted
}

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"]
  })
);
app.use(express.json({ limit: "4mb" }));
app.use(morgan("dev"));

// Root status route so visiting https://riyadvi-backend-api.onrender.com/ never returns 404
app.get("/", (req, res) => {
  res.json({
    success: true,
    service: "Riyadvi Software Technologies — Full-Stack API & Dynamic CMS Engine",
    databaseConnected: mongoose.connection.readyState === 1,
    endpoints: [
      "GET  /api/health",
      "GET  /api/content",
      "GET  /api/services",
      "GET  /api/portfolio",
      "GET  /api/blogs",
      "GET  /api/careers",
      "POST /api/ai/architect",
      "POST /api/contact",
      "POST /api/consultation",
      "POST /api/health-checkup",
      "POST /api/lead-magnet",
      "POST /api/applications",
      "GET  /api/admin/dashboard",
      "POST /api/admin/content/:type"
    ]
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    service: "Riyadvi Software Technologies API",
    databaseConnected: mongoose.connection.readyState === 1,
    databaseState: mongoose.connection.readyState === 1 ? "MongoDB Atlas Connected" : "In-Memory Fallback",
    timestamp: new Date().toISOString()
  });
});

app.use("/api", apiRoutes);
app.use(errorHandler);

async function startServer() {
  if (process.env.MONGODB_URI) {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("✅ Connected to MongoDB database");
      await ensureInitialContentSeeded();
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
