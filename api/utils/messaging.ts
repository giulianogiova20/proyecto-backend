import twilio from 'twilio'
import Logger from './logger'
import config from '../config'


const client = twilio(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_TOKEN)

class MessageService{
    
    async newSMS(user: any){
        try{ 
            await client.messages.create({
                body: `Your order has been received and is being process`,
                from: config.TWILIO_NUMBER,
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
                from: `whatsapp:${config.TWILIO_WHATSAPP}`,
                to: `whatsapp:${config.TWILIO_ADMIN_NUMBER}`
            })
        } catch(err){
            Logger.error(`An error has occurred when sendinding a Whatsapp message`)
        }
    }
}

export default new MessageService()