import { Router } from 'express'

export const home = Router()

import {renderHome} from "../controllers/session"

home.get('/', renderHome)