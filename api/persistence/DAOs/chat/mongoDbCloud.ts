import mongoose from 'mongoose'
import mongoConnection from '../../mongoDB/connection'
import IChatDAO from './IChatDAO'
import chatModel from '../../../models/schemas/chatSchema'
import ChatDTO from '../../DTOs/ChatDTO'
import { UserService } from '../../../services'

class ChatMongoDAO extends IChatDAO {

    chatModel: mongoose.Model<any, {}, {}, {}>
    DTO: any
    static instance: ChatMongoDAO

    constructor(chat: mongoose.Model<any, {}, {}, {}>, DTO: any) {
        super()
        this.chatModel = chat
        this.DTO = DTO
        mongoConnection()
    }

    static getInstance(chatModel: mongoose.Model<any, {}, {}, {}>, DTO: any){
        if(!this.instance) {
            this.instance = new ChatMongoDAO(chatModel, DTO)
        }
        return this.instance
      }

    public async addMessage(user: any, newMessage: String, sender: String): Promise<void> {
        //const findUser = await UserService.getUser(user)
        const findUser = await this.chatModel.findOne({user: user.name})
        if (findUser)
        await

    }
    
}

export default ChatMongoDAO.getInstance(chatModel, ChatDTO)