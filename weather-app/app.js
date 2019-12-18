const request = require('request')

const url = 'https://api.darksky.net/forecast/9a0bf19a7ea34b1fa05df9e14ff1709e/37.8267,-122.4233'


// Goal: Print a small forecast to the user
// 1. Print: "It is currently 58.55 degrees out. There is a 0% chance of rain."
// 2. Test your work

request({ url: url, json: true }, (error, response) => {
    const body = response.body

    console.log(body.daily.data[0].summary)
    console.log('It is currently ' + body.currently.temperature + ' degrees out.')
    console.log('There is a ' + body.currently.precipProbability + '% chance of rain.')
})

// Geocoding
// Address -> Lat/Long -> Weather

// Goal: Print the lat/long for Los Angeles
// 1. Fire off a new request to the URL explored in browser
// 2. Have the request module parse it as JSON
// 3.Print both the latitude and longitude to the terminal
// 4. Test your work

const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiYXBhdHJpY2lhbWNhc3RybyIsImEiOiJjazRiNGxiOHcwYWRzM21wbTNraTJoaWE0In0.q6ELa9nSIHIuEfNG4tQxcw&limit=1'

request({ url: geocodeURL , json: true }, (error, response) => {
    const longitude = response.body.features[0].center[0]
    const latitude = response.body.features[0].center[1]
    console.log('Latitude: ' + latitude)
    console.log('Longitude: ' + longitude)
})
