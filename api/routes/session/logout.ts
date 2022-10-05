import { Router } from "express";
import {sessionController } from "../../controllers/session"

export const sessionLogout = Router();

sessionLogout.post("/", sessionController.logout);

