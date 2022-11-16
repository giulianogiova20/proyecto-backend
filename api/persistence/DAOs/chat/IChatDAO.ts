class IChatDAO {
    constructor(){}

    async addMessage(newMessage: any){
        throw new Error('Chat addMessage not Implemented')
    }

    async getMessages(){
        throw new Error('Chat getMessages not Implemented')
    }
}

export default IChatDAO