const socket = io()

//elements
const $messageForm = document.querySelector('#messageForm')
const $messageBox = $messageForm.querySelector('input')
const $messageButton = $messageForm.querySelector('button')
const $locationButton = document.querySelector('#location')
const $messages = document.querySelector('#messages')
const $sidebar = document.querySelector('#sidebar')

//Templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationTemplate = document.querySelector('#location-template').innerHTML
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML
//Query String Parsing
const {username, room} = Qs.parse(location.search, {ignoreQueryPrefix:true})

//autoscroll
const autoscroll = ()=>{
    //New message element
    const $newMessage = $messages.lastElementChild
    //height of the new message
    const newMessageMargin = parseInt(getComputedStyle($newMessage).marginBottom)
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin
    //visible height
    const visibleHeight = $messages.offsetHeight
    //height of messages container
    const containerHeight = $messages.scrollHeight
    //current scroll location
    const scrollOffset = $messages.scrollTop + visibleHeight

    //logic
    if(containerHeight - newMessageHeight <= scrollOffset){
        $messages.scrollTop = $messages.scrollHeight
    }
}

//Events
socket.on('receive', (message)=>{
    const senderClass = (message.username === 'ADMIN' || message.username === 'YOU') ? message.username.toLowerCase() : 'other'
    const html = Mustache.render(messageTemplate, {
        message: message.text,
        createdAt: moment(message.createdAt).format('h:mm A'),
        username: message.username,
        senderClass
    })
    $messages.insertAdjacentHTML('beforeend', html)
    autoscroll()
})

socket.on('receiveLocation', (location)=>{
    const senderClass = (location.username === 'ADMIN' || location.username === 'YOU') ? location.username.toLowerCase() : 'other'
    const html = Mustache.render(locationTemplate, {
        link: location.link,
        createdAt: moment(location.createdAt).format('h:mm A'),
        username: location.username,
        senderClass
    })
    $messages.insertAdjacentHTML('beforeend', html)
    autoscroll()
})

socket.on('roomData', ({room, users}) => {
    const html = Mustache.render(sidebarTemplate, {
        room,
        users
    })
    $sidebar.innerHTML =  html
})

$messageForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    
    $messageButton.setAttribute('disabled', 'disabled')

    socket.emit('send', e.target.elements.messageBox.value, (error)=>{
        $messageButton.removeAttribute('disabled')
        $messageBox.value = ''
        $messageBox.focus()
        
        if(error){console.log(error)}
    })
})

$locationButton.addEventListener('click', (e)=>{
    if(!navigator.geolocation){
        return alert('Geolocation is not supported by your browser')
    }

    $locationButton.setAttribute('disable', 'disable')

    navigator.geolocation.getCurrentPosition((position)=>{
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, (error)=>{
            $locationButton.removeAttribute('disable')
            if(error) {console.log(error)}
        })
    })
})

socket.emit('join', {username, room}, (error)=>{
    if(error){
        location.href = '/'
        alert(error)
    }
})