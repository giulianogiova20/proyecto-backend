import { Request, Response } from 'express';
import config from '../config'
import Logger from '../utils/logger';

class InfoController {

  async renderInfo (req: Request, res: Response) {
    try {
      res.render('info', {config})
    } catch (error) {
      Logger.error(`Error in Info method: ${error}`)
    }
  }
}


export default new InfoController