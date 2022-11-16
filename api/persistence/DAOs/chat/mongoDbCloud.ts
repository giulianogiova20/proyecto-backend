import mongoose from 'mongoose'
import mongoConnection from '../../mongoDB/connection'
import IChatDAO from './IChatDAO'
import chatModel from '../../../models/schemas/chatSchema'
import ChatDTO from '../../DTOs/ChatDTO'

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

    public async addMessage(newMessage: any): Promise<void> {
        const dataInput = new this.chatModel(newMessage)
        await dataInput.save()
    }
    
    public async getMessages() {

        const foundChat = await this.chatModel.find()
    
        if (foundChat === null) throw new Error(`Your chat is empty.`)
    
        const data: any = foundChat.map( entity => 
        new this.DTO(entity).toJson())
    
        return data
      }
}

export default ChatMongoDAO.getInstance(chatModel, ChatDTO)