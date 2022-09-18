import { Router } from 'express';
import renderInfo from '../controllers/info';

export const info: Router = Router();

info.get('/', renderInfo);