const socket = io()

// Elements
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $sendLocationButton = document.querySelector('#send-location')

socket.on('message', (message) => {
    console.log(message)
})

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault()

    // disables the form once it's been submitted
    $messageFormButton.setAttribute('disabled', 'disabled')
  
    const message = e.target.elements.message.value

    socket.emit('sendMessage', message, (error) => {

        // re-enable Send Button, clear input and brings focus to input
        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value = ''
        $messageFormInput.focus()

        if(error) {
            return console.log(error)
        }
        console.log('Message delivered!')
       
    })
})

// Goal: Disable the send location button while location being sent
// 1. Set up a selector at the top of the file
// 2. Disable the button just before getting the current position
// 3. Enable the button in the acknowledgement callback
// 4. Test

$sendLocationButton.addEventListener('click', () => {
    if(!navigator.geolocation) {
        return alert('Geolocation not supported')
    }

    $sendLocationButton.setAttribute('disabled', 'disabled')

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
    },() => {
        $sendLocationButton.removeAttribute('disabled')
        console.log('Location shared!')  
        })
    })
})

