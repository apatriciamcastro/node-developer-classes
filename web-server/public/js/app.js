console.log('Client side JS')

// Goal: Fetch weather
// 1. Setup a call to fetch weather for Porto, Portugal
// 2. Get the parse JSON response
//  - If error property, print error
//  - If no error property, print location and forecast
// 3. Refresh the browser and test your work

fetch('http://localhost:3000/weather?address=porto,portugal').then((response) => {
    response.json().then((data) => {
        if(data.error){
            console.log(data.error)
        } else {
            console.log(data.location)
            console.log(data.forecast)
        }
    })
})