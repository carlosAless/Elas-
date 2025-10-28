// server.js
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoute.js"; // ✅ Extensão .js necessária

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8081;

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173", // Seu frontend local (Vite)
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

app.use("/auth", authRoutes);

// ✅ Adicione uma rota de health check para testar
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
