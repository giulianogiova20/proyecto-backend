import { Router } from 'express'
import { ChatController } from '../controllers'
import checkUserAuth from '../middlewares/checkUserAuth'

const ChatRouter = Router()

ChatRouter.get('/', ChatController.renderChat)
ChatRouter.post('/', checkUserAuth, ChatController.addMessage)

export default ChatRouter