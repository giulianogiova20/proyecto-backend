const socket = io()

const formMessageInput = document.querySelector('#formMessage')
const userEmailInput = document.querySelector('#userEmail')
const messageInput = document.querySelector('#messageInput')
const messagesPool = document.querySelector('#messagesPool')


const sendMessage = () => {
    try {
        const message = {
            mail: userEmailInput.value,
            body: messageInput.value,
            timestamp: new Date().toLocaleString('es-AR')
          }
        socket.emit('client:message', message)
    } catch (error) {
        console.log(`Han error has ocurred in sendMessage: ${error}`)
    }
}

const renderMessages = async (messages) => {
    try {
        const template = await fetch('../chat.hbs')
        const hbsTemplateCompiled = Handlebars.compile(await template.text())
        messagesPool.innerHTML = hbsTemplateCompiled({messages}) 
    } catch(error) {
        console.log(`Hubo un error ${error}`)
    }
}


/* CLIENT EVENTS */

formMessage.addEventListener('submit', event => {
    event.preventDefault()
    sendMessage()
    messageInput.value = "" 
})

/* SERVER EVENTS */

socket.on('server:message', renderMessages)

