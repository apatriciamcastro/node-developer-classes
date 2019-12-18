const geocode = require ('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

/* geocode('Porto,Portugal', (error, data) => {
    console.log('Error', error)
    console.log('Data', data)
})

// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

forecast(41.1524, -8.6351, (error, data) => {
    console.log('Error', error)
    console.log('Data', data)
  })
 */


// Goal: Accept location via command line argument
//
// 1. Access the location line argument without yargs
// 2. Use the string value as the input for geocode
// 3. Only geocode if a location was provided
// 4. Test your work with a couple locations 
const location = process.argv[2]

if(!location) {
    console.log('Please provide a location.')
} else {
    geocode(location, (error, data) => {
        if(error) {
           return console.log(error)
        } else if(location) {
            forecast(data.latitude, data.longitude, (error, forecastData) => {
                if(error) {
                    return console.log(error)
                }
                location === data.location
                console.log(data.location)
                console.log(forecastData)
          })
        }
        
    })
}
  