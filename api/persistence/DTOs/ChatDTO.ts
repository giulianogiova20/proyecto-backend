class ChatDTO {

    user: string
    messages: [Object]
    timestamp: string   
    

    constructor( chat: any ) {
        this.user = chat.user 
        this.messages = chat.messages
        this.timestamp = chat.timestamp 
    }

    toJson(){
        const ChatDisplayed = {
            user: this.user,
            messages: this.messages,
            timestamp: this.timestamp,
        }
        return ChatDisplayed
    }
}

export default ChatDTO