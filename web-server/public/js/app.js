console.log('Client side JS')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

// Goal: use input value to get weather
// 1. Migrate fecth call into the submit callback
// 2. Use the search text as the address query string value
// 3. Submit the form with a valid and invalid value to test

weatherForm.addEventListener('submit', (event) => {
    // to prevent the default behavior of the form: update the whole page
    event.preventDefault()

    const location = search.value

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            console.log(data.error)
        } else {
            console.log(data.location)
            console.log(data.forecast)
        }
    })
})
})

