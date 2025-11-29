import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import connectDB from "./Utils/Db.js";
import errorHandler from "./Middlewares/errorHandler.js";
import authRoutes from "./Routes/authRoutes.js";
import userRoutes from "./Routes/userRoutes.js";
import jobRoutes from "./Routes/jobRoutes.js";
import applicationRoutes from "./Routes/applicationRoutes.js";
import contactRoutes from "./Routes/ContactRoutes.js"
import adminRoutes from "./Routes/adminRoutes.js"
import chatBotRoutes from "./Routes/chatBotRoutes.js"

dotenv.config();
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:5173","http://localhost:5174"],
    credentials: true,
}));
app.use(express.json());

const limiter = rateLimit({ windowMs: 60 * 1000, max: 100 });
app.use(limiter);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes );
app.use("/api/contact", contactRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/chatbot',chatBotRoutes )

// Error handler
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});
