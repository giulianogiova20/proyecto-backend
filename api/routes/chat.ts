import { Router } from 'express'
import { ChatController } from '../controllers'

const ChatRouter = Router()

ChatRouter.get('/', ChatController.renderChatForm)

export default ChatRouter