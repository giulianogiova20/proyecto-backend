import mongoose from 'mongoose'

//One entry per user, it saves both messages from admin and user
const chatSchema = new mongoose.Schema({
    user: {
        type: String, required: true
    },
    messages: [{ 
        sender: { type: String, required: true }, // admin or user
        body: [{ type: String }],
        timestamp: {
            //When new message is added to array
            type: String,
            required: true,
            default: new Date().toLocaleString()
        },
        _id : false
      }],
    timestamp: {
        //When chat is created
        type: String,
        required: true,
        default: new Date().toLocaleString()
    },
})

export default mongoose.model('chats', chatSchema)