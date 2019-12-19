const geocode = require ('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

// Goal: Use both destructuring and property shorthand in weather app
// 1. Use destructuring in app.js, forecast.js and geocode.js
// 2. Use property shorthand in forecast.js and geocode.js
// 3. Test your work and ensure app still works

const search = process.argv[2]

if(!search) {
    console.log('Please provide a location.')
} else {
    geocode(search, (error, { latitude, longitude, location }) => {
        if(error) {
           return console.log(error)
        } else if(location) {
            forecast(latitude, longitude, (error, forecastData) => {
                if(error) {
                    return console.log(error)
                }
                search === location
                console.log(location)
                console.log(forecastData)
          })
        }
        
    })
}
  
