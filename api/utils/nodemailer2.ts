import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import Logger from '../utils/logger'

dotenv.config()

const gmailtransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_MAIL,
        pass: process.env.GMAIL_PROVISIONAL_PASS
    }
});

class MailSender{
    transporter: nodemailer.Transporter    
    
    constructor(){
        this.transporter = gmailtransporter
    }
    async newRegister(user: any){
        try{ 
            await this.transporter.sendMail({
                from: 'E-commerce GG',
                to: process.env.GMAIL_MAIL,
                subject: `New registered user`,
                html: ` <p>${user.name}</p> 
                        <p>${user.email}</p>
                        <p>${user.address}</p>   
                        <p>${user.age}</p>
                        <p>${user.phoneNumber}</p>
                        <img src=${user.picture}/>`,
            })
        }catch(err){
            Logger.error(`An error has occurred when sending the user registration email: ${user.email}`)
        }
    }

    async newOrder( user: any, products: any ){
        try{
            await this.transporter.sendMail({
                from: 'E-commerce GG',
                to: process.env.GMAIL_MAIL,
                subject: `New order from ${user.name}`,
                html: `
                    <h5> User: </h5>
                        <p>${user.name}</p> 
                        <p>${user.email}</p> 
                        <p>${user.phoneNumber}</p>
                        </hr>
            
                        <h2> Pedido </h2>
                        <ul>
                         ${ products.map((product: any) => `<li>${product.name}</li>`) } 
                        </ul>
                        `
            })
        }catch(err){
            Logger.error(`An error has occurred when sending the user registration email: ${user.email}`)
        }
    }

}


export default new MailSender()