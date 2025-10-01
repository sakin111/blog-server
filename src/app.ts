import compression from "compression";
import cors from "cors";
import express from "express";
import { router } from "./route";


const app = express();

app.use(cors()); 
app.use(compression()); 
app.use(express.json()); 

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api/v1", router);

app.get("/", (_req, res) => {
  res.send("server is running");
});


app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

export default app;
