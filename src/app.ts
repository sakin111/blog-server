import compression from "compression";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import { router } from "./app/route";
import { envVar } from "./app/config/env";

const app = express();

app.set("trust proxy", 1);
app.use(cookieParser());
app.use(express.json());
app.use(compression());

// ✅ CORS configuration for Vercel + Render
app.use(
  cors({
    origin: [
      "https://blog-app-pied-three.vercel.app", // your frontend
      "http://localhost:3000",                  // local dev
    ],
    credentials: true, // ✅ allow cookies
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.use("/api/v1", router);

app.get("/", (_req, res) => {
  res.send("Server is running 🚀");
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route Not Found" });
});

export default app;
