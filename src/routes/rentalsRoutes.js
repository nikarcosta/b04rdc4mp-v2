import { Router } from "express";
import { getRentals } from "../controllers/rentalsController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { gameSchema } from "../schemas/gamesSchema.js";

const rentalsRouter = Router();

rentalsRouter.get("/rentals", getRentals);

export default rentalsRouter;
