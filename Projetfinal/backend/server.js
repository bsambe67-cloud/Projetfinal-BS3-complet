import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",").map((origin) => origin.trim());

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== "production") {
      return callback(null, true);
    }
    return callback(new Error("Origine non autorisée par CORS."));
  }
}));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "API BS3 opérationnelle." });
});
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use(notFound);
app.use(errorHandler);

connectDB()
  .then(() => app.listen(port, () => console.log(`Serveur démarré sur http://localhost:${port}`)))
  .catch((error) => {
    console.error("Impossible de démarrer le serveur :", error.message);
    process.exit(1);
  });
