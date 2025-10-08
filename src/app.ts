import compression from "compression";
import cors from "cors";
import express from "express";
import { router } from "./app/route";
import cookieParser from "cookie-parser";


const app = express();

app.use(cookieParser())
app.use(express.json()); 
app.set("trust proxy",1)
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(compression()); 



app.use("/api/v1", router);

app.get("/", (_req, res) => {
  res.send("server is running");
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route Not Found" });
});

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

export default app;
