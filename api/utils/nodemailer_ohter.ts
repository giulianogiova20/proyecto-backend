import dotenv from 'dotenv'
import { createTransport } from 'nodemailer'
import Logger from './logger'

dotenv.config()

const adminEmail = 'giuliano.giovanelli@gmail.com'

const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'giuliano.giovanelli@gmail.com',
        pass: process.env.GMAIL_PROVISIONAL_PASS
    }
})

const mailOptions = {
    from: 'Servidor Node.js',
    to: adminEmail,
    subject: 'New user registered',
    html: '<h1 class="mt-3 text-center text-danger"> A new user has been registered to the platform! </h1>'
}

const sendEmail = async () => {
    try {
        const info = await transporter.sendMail(mailOptions)
        Logger.info(info)
    } catch(err) {
        Logger.error(err)
    }
}

export default sendEmail