import { Router } from 'express'
import { InfoController } from '../controllers/'

const InfoRouter = Router()

InfoRouter.get('/', InfoController.renderInfo)

export default InfoRouter