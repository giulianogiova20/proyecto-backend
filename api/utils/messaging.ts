import twilio from 'twilio'
import dotenv from 'dotenv'
import Logger from './logger'

dotenv.config()

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

class MessageService{
    
    async newSMS(user: any){
        try{ 
            await client.messages.create({
                body: `Your order has been received and is being process`,
                from: process.env.TWILIO_NUMBER,
                to: user.phoneNumber
            })
        } catch(err){
            Logger.error(`An error has occurred when sending a SMS: ${user.email}`)
        }
    }   

    async newWhatsapp(user: any){
        try{ 
            await client.messages.create({
                body: `New order from ${user.name} - ${user.email}`,
                from: `whatsapp:${process.env.TWILIO_WHATSAPP}`,
                to: `whatsapp:${process.env.TWILIO_ADMIN_NUMBER}`
            })
        } catch(err){
            Logger.error(`An error has occurred when sendinding a Whatsapp message`)
        }
    }
}

export default new MessageService()