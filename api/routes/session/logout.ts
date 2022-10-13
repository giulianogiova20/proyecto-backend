import { Router } from "express";
import { SessionController } from "../../controllers"

export const sessionLogout = Router();

sessionLogout.post("/", SessionController.logout);

