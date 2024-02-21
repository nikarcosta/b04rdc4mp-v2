import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import gamesRouter from "./routes/gamesRoutes.js";
import clientsRouter from "./routes/clientsRoutes.js";

const server = express();
server.use(cors());
server.use(express.json());
server.use([gamesRouter, clientsRouter]);

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server running at PORT = ${PORT}.`);
});
