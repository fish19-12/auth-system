import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend connected!" });
});

// Test route

app.get("/api/test", (req, res) => {
  console.log("GET /api/test called"); // log for Render
  res.json({ message: "Backend alive" });
});

// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("mongoDB connected"))
  .catch((err) => console.log(err));

// Server

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
