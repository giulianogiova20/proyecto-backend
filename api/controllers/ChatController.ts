import { Request, Response } from 'express';
import Logger from '../utils/logger'


class ChatController {

  async renderChatForm(req: Request, res: Response) {       
      try {
          res.status(200).render('home')
      } catch (error) {
          Logger.error(`Error in renderChatForm method, chatController: ${error}`)
      }
  }
}


export default new ChatController