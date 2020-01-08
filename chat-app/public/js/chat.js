const socket = io()

socket.on('message', (message) => {
    console.log(message)
})

document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault()

    const message = e.target.elements.message.value

    socket.emit('sendMessage', message, (error) => {
        if(error) {
            return console.log(error)
        }
        console.log('Message delivered!')
       
    })
})

// Goal: Setup acknowledgement for location
// 1. Setup the client acknowledgment function
// 2. Setup the server to send back the acknowledgement
// 3. Have the client print "Location shared!" when acknowledged
// 4. Test your work

document.querySelector('#send-location').addEventListener('click', () => {
    if(!navigator.geolocation) {
        return alert('Geolocation not supported')
    }

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
    },() => {
        console.log('Location shared!')  
        })
    })
})

