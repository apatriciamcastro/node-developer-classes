const express = require('express')
const http = require('http')
const path = require('path')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))


// Goal: Allow clients to send messages
// 1. Create a form with an input and button
//      - Similar to the weather form
// 2. Setup event listener for form submissions
//      - Emit "sendMessage" with input string as message data
// 3. Have server listen for "sendMessage"
//      - Send message to all connected clients
// 4. Test your work

io.on('connection', (socket) => {
    console.log('New websocket connection')

    socket.on('sendMessage', (message) => {
        io.emit('message', message)
    })

} )

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})