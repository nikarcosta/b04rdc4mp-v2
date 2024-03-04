import { Router } from "express";
import {
  getRentals,
  postRentals,
  updateRentals,
  deleteRentals,
} from "../controllers/rentalsController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { rentalSchema } from "../schemas/rentalsSchema.js";

const rentalsRouter = Router();

rentalsRouter.get("/rentals", getRentals);
rentalsRouter.post("/rentals", validateSchema(rentalSchema), postRentals);
rentalsRouter.put("/rentals/:id/return", updateRentals);
rentalsRouter.delete("/rentals/:id", deleteRentals);

export default rentalsRouter;
