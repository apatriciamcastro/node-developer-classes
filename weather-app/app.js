const request = require('request')

const url = 'https://api.darksky.net/forecast/9a0bf19a7ea34b1fa05df9e14ff1709e/41.1524,-8.6351?units=si'


// Goal: Print a small forecast to the user
// 1. Print: "It is currently 58.55 degrees out. There is a 0% chance of rain."
// 2. Test your work

request({ url: url, json: true }, (error, response) => {
    if(error) {
        console.log('Unable to connect to Weather service.')
    } else if (response.body.error){
        console.log('Unable to find location. Please check the coordinates.')
    } else {
    const body = response.body

    console.log(body.daily.data[0].summary)
    console.log('It is currently ' + body.currently.temperature + ' degrees out.')
    console.log('There is a ' + body.currently.precipProbability + '% chance of rain.')
    }   
})

// Geocoding
// Address -> Lat/Long -> Weather

// Goal: Print the lat/long for Los Angeles
// 1. Fire off a new request to the URL explored in browser
// 2. Have the request module parse it as JSON
// 3.Print both the latitude and longitude to the terminal
// 4. Test your work

// Goal: Handle errors for geocoding request
// 1. Setup an error handler for low-level errors
// 2. Test by desabling network request and running the app
// 3. Setup error handling for no matching results
// 4. Test by altering the search term and running the app

const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Porto,Portugal.json?access_token=pk.eyJ1IjoiYXBhdHJpY2lhbWNhc3RybyIsImEiOiJjazRiNGxiOHcwYWRzM21wbTNraTJoaWE0In0.q6ELa9nSIHIuEfNG4tQxcw&limit=1'

request({ url: geocodeURL , json: true }, (error, response) => {
    if(error){
        console.log('Unable to connect to Location service.')
    } else if (response.body.features.length === 0) {
        console.log('Unable to find location. Please try a different search.')
    } else {
        const longitude = response.body.features[0].center[0]
        const latitude = response.body.features[0].center[1]
    
        console.log('Latitude: ' + latitude)
        console.log('Longitude: ' + longitude)
    }
})
