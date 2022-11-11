import { Router } from 'express';
import renderInfo from '../controllers/info';

const InfoRouter = Router()

InfoRouter.get('/', renderInfo)

export default InfoRouter