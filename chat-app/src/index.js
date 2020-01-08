const express = require('express')
const http = require('http')
const path = require('path')
const socketio = require('socket.io')
const Filter = require('bad-words')
const { generateMessage, generateLocationMessage } = require('./utils/messages')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
    console.log('New websocket connection')

    socket.on('join', (options, callback) => {
       const { error, user } = addUser({ id: socket.id, ...options })

       if(error) {
           return callback(error)
       }

        socket.join(user.room)
    
        socket.emit('message', generateMessage('Admin',`Welcome, ${user.username}!`))
        socket.broadcast.to(user.room).emit('message', generateMessage('Admin',`${user.username} has joined.`))

        callback()
    })

    // Goal: Send messages to correct room
    // 1. Use getUser inside "sendMessage" event handler to get user data
    // 2. Emit the message to their current room
    // 3. Test your work
    // 4. Repeat for "sendLocation"
    
    // Goal: Render username for text messages
    // 1. Setup the server to send username to client
    // 2. Edit every call to "generateMessage" to include username
    //      - Use "Admin" for sys messages like connect/welcome/disconnect
    // 3. Update client to render username in template
    // 4. Test your work

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)
        const filter = new Filter()

        if(filter.isProfane(message)) {
            return callback('Profanity is not allowed!')
        }
        io.to(user.room).emit('message', generateMessage(user.username, message))
        callback()
    })
   

    socket.on('sendLocation', (location, callback) => {
        const user = getUser(socket.id)
        io.to(user.room).emit('locationMessage', generateLocationMessage(user.username,`https://google.com/maps?q=${location.latitude},${location.longitude}`))
        callback()
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)
        
        if(user) {
            io.to(user.room).emit('message', generateMessage('Admin', `${user.username} has left the building.`))
        }
    })
} )

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})