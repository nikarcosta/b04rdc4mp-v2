import { Router } from "express";
import { postClients } from "../controllers/clientsController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { clientSchema } from "../schemas/clientsSchema.js";

const clientsRouter = Router();

clientsRouter.post("/customers", validateSchema(clientSchema), postClients);

export default clientsRouter;
