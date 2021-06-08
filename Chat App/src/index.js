const express = require('express')
const http = require('http')
const path = require('path')
const socketio = require('socket.io')
const {generateMessage, generateLocation} = require('./utils/message.js')
const {addUser, removeUser, getUser, getUsersInRoom} = require('./utils/users.js')


const port = process.env.PORT || 3000
const publicdir = path.join(__dirname, '../public')

const app = express()
// Refactoring for socket.io
const server = http.createServer(app)
// socketio is called on raw http server
const io = socketio(server)

app.use(express.static(publicdir))

io.on('connection', (socket)=>{
    socket.on('join', (options, callback)=>{
        const {error, user} = addUser({ id:socket.id, ...options })
        if(error){
            return callback(error)
        }
        
        socket.join(user.room)
        socket.emit('receive', generateMessage('ADMIN', 'Welcome'))
        socket.broadcast.to(user.room).emit('receive', generateMessage('ADMIN', `${user.username} joined`))
        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        })
        callback()
    })
    
    socket.on('send', (msg, callback)=>{
        const user = getUser(socket.id)
        if(!user){
            return callback(error)
        }
        socket.broadcast.to(user.room).emit('receive', generateMessage(user.username, msg))
        socket.emit('receive', generateMessage('YOU', msg))
        callback()
    })

    socket.on('sendLocation', (coords, callback)=>{
        const user = getUser(socket.id)
        if(!user){
            return callback(error)
        }
        socket.broadcast.to(user.room).emit('receiveLocation', generateLocation(user.username, coords))
        socket.emit('receiveLocation', generateLocation('YOU', coords))
        callback()
    })

    socket.on('disconnect', ()=>{
        const user = removeUser(socket.id)
        if(user){
            io.to(user.room).emit('receive', generateMessage('ADMIN',`${user.username} left`))
        }
        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        })
    })
})

server.listen(port, ()=>{
    console.log('Listening on PORT:', port)
})