import http, { Server } from "http";
import app from "./app";
import dotenv from "dotenv";
import { prisma } from "./config/db";
import { envVar } from "./app/config/env";
import { seedAdmin } from "./app/utils/seedAdmin";



let server: Server | null = null;

async function connectToDB() {
  try {
    await prisma.$connect()
    console.log("DB connection successful")
  } catch (error) {
    console.log("DB connection failed")
    process.exit(1);
  }
}

async function startServer() {
  try {
    await connectToDB()
    server = http.createServer(app);
    server.listen(process.env.PORT, () => {
      console.log(` Server is running on port ${envVar.PORT}`);
    });

  } catch (error) {
    console.error(" Error during server startup:", error);
    process.exit(1);
  }
}

(async() =>{
  await startServer(),
  await seedAdmin()
})()


process.on("SIGTERM", (err) => {
    console.log("sigterm  detected, shutting down the server...." ,err)
    if (server){
        server.close(() =>{
            process.exit(1)
        })
    }
    process.exit(1)
})
process.on("unhandledRejection", (err) => {
    console.log("unhandledRejection is detected, shutting down the server" ,err)
    if (server){
        server.close(() =>{
            process.exit(1)
        })
    }
    process.exit(1)
})
process.on("uncaughtException", (err) => {
    console.log("uncaughtException is detected, shutting down the server" ,err)
    if (server){
        server.close(() =>{
            process.exit(1)
        })
    }
    process.exit(1)
})

