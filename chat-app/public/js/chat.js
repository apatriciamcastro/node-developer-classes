const socket = io()

socket.on('message', (message) => {
    console.log(message)
})

document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault()

    const message = e.target.elements.message.value
    socket.emit('sendMessage', message)
})

// Goal: Share coordinates with other users
// 1. Have client emit "sendLocation" with an object as the data
//      - Object should contain latitude and longitude properties
// 2. Server should listen for "sendLocation"
//      - When fired, send a "message" to all connected clients "Location: long, lat"
// 3. Test your work! :D

document.querySelector('#send-location').addEventListener('click', () => {
    if(!navigator.geolocation) {
        return alert('Geolocation not supported')
    }
    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    })
})



