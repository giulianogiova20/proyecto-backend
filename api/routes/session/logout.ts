import { Router } from "express";

import { logout } from "../../controllers/session"

export const sessionLogout = Router();

sessionLogout.post("/", logout);