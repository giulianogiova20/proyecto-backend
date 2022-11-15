import { Request, Response } from 'express';
import config from '../config'
import Logger from '../utils/logger'
import ChatService from '../services/ChatService';
import { User } from '../interfaces';

class ChatController {

  async renderChat (req: Request, res: Response) {
    try {
        const user = req.user
        //const messages = await ChatService.getMessages()
        //res.render('chat', {messages, user})
    } catch (error) {
      Logger.error(`Error in Chat method: ${error}`)
    }
  }

  async addMessage (req: Request, res: Response) {
    try {    
        const user: any = req.user
        const newMessage = req.body    
    
        if (user.isAdmin) { 
            const {chat_user} = req.params
            const sender = "admin"
            await ChatService.addMessage(chat_user,newMessage, sender)
        }
        const sender = "user"
        await ChatService.addMessage(user,newMessage)
        return
    } catch (error) {
      Logger.error(`Error in Chat method: ${error}`)
    }
  }

}


export default new ChatController