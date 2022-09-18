const socket = io()

const productsList = document.querySelector('#products')
const addProduct = document.querySelector('#addProduct')
const productTitleInput = document.querySelector('#productTitle')
const productPriceInput = document.querySelector('#productPrice')
const productThumbnailInput = document.querySelector('#productThumbnail')

const formMessageInput = document.querySelector('#formMessage')
const userEmailInput = document.querySelector('#userEmail')
const userNameInput = document.querySelector('#userName')
const userLastnameInput = document.querySelector('#userLastname')
const userAgeInput = document.querySelector('#userAge')
const userAliasInput = document.querySelector('#userAlias')
const userAvatarInput = document.querySelector('#userAvatar')
const messageInput = document.querySelector('#messageInput')
const messagesPool = document.querySelector('#messagesPool')


const sendMessage = () => {
    try {
        let time = new Date().toLocaleDateString('es-AR')
        const message = {
            author: {
              email: userEmailInput.value,
              name: userNameInput.value,
              lastname: userLastnameInput.value,
              age: userAgeInput.value,
              alias: userAliasInput.value,
              avatar: userAvatarInput.value,
            },
            text: messageInput.value,
            time: time
          }
        socket.emit('client:message', message )
    } catch (error) {
        console.log(`Han error has ocurred: ${error}`)
    }
}

const renderMessages = async (messages) => {
    try {
        const template = await fetch('chat.hbs')
        const hbsTemplateCompiled = Handlebars.compile(await template.text())
        messagesPool.innerHTML = hbsTemplateCompiled({messages}) 
    } catch(error) {
        console.log(`Hubo un error ${error}`)
    }
}

const sendProduct = () => {
    try {
        const name = productTitleInput.value
        const price = Number(productPriceInput.value)
        const photoURL = productThumbnailInput.value
        socket.emit('client:product', { name, price, photoURL })
    } catch (error) {
        console.log(`Han error has ocurred: ${error}`)
    }
}

const renderProducts = async (products) => {
    try {
        const template = await fetch('product.hbs')
        const hbsTemplateCompiled = Handlebars.compile(await template.text())
    
        productsList.innerHTML = hbsTemplateCompiled({products})
      } 
      catch (error) {
        console.log(`Han error has ocurred: ${error}`)
      }
}

/* CLIENT EVENTS */

addProduct.addEventListener('submit', event => {
    event.preventDefault()
    sendProduct()
    productTitleInput.value = ""
    productPriceInput.value = ""
    productThumbnailInput.value = ""
})

formMessage.addEventListener('submit', event => {
    event.preventDefault()
    sendMessage()
    messageInput.value = "" 
})

/* SERVER EVENTS */

socket.on('server:products', products => {renderProducts(products)})

socket.on('server:message', renderMessages)

