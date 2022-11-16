import m from "../persistence/factory"
import Logger from "../utils/logger"
const model = m("chat")


class ChatService {

    model: any

    constructor(model: any){
        this.model = model
     }

    async addMessage(newMessage: any){
        try {
            await this.model.addMessage(newMessage)
        } catch (error) {
            Logger.error({error: 'Error in addMessage service'})
        }
        
    }

    async getMessages(){
        try {
            return await this.model.getMessages()
        } catch (error) {
            Logger.error({error: 'Error in getMessage service'})
        }
        
    }
}

export default new ChatService(model)