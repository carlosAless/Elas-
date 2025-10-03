import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoute.js"; // ✅ Extensão .js necessária

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

// ✅ Adicione uma rota de health check para testar
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running on Vercel" });
});

// ✅ Rota raiz também
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "Backend API Online",
    timestamp: new Date().toISOString(),
  });
});

// ⚠️ REMOVER app.listen() ⚠️
// ❌ app.listen(PORT, () => { ... });

// ✅ Export para Vercel (ES Modules)
export default app;
