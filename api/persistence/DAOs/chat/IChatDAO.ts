class IChatDAO {
    constructor(){}

    async addMessage(req: any, user: any, newMessage: String){
        throw new Error('Chat addMessage not Implemented')
    }
}

export default IChatDAO