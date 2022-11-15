import m from "../persistence/factory"
const model = m("chat")

class ChatService {

    model: any

    constructor(model: any){
        this.model = model
     }

    async addMessage(newMessage: String, user: any, sender: String){
        return await this.model.addMessage(newMessage, user, sender)
    }

}

export default new ChatService(model)