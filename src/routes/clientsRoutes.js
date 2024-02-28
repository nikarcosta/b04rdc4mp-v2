import { Router } from "express";
import {
  postClients,
  getClients,
  getClientsById,
  updateClients,
} from "../controllers/clientsController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { clientSchema } from "../schemas/clientsSchema.js";

const clientsRouter = Router();

clientsRouter.post("/customers", validateSchema(clientSchema), postClients);
clientsRouter.get("/customers", getClients);
clientsRouter.get("/customers/:id", getClientsById);
clientsRouter.put(
  "/customers/:id",
  validateSchema(clientSchema),
  updateClients
);

export default clientsRouter;
