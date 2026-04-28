import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import { fileURLToPath } from 'url';

dotenv.config();
connectDB();

const app = express();

// Configure CORS
app.use(cors({
  origin: ['https://smart-operations-system-qd4i.onrender.com', 'http://localhost:5173'],
  credentials: true
}));

app.use(express.json());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// 👇 SERVE FRONTEND (IMPORTANT)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// 👇 ERROR HANDLERS (MUST BE LAST)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});