import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import gamesRouter from "./routes/gamesRoutes.js";

const server = express();
server.use(cors());
server.use(express.json());
server.use([gamesRouter]);

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server running at PORT = ${PORT}.`);
});
