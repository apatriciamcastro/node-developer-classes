const request = require('request')

const url = 'https://api.darksky.net/forecast/9a0bf19a7ea34b1fa05df9e14ff1709e/37.8267,-122.4233'


// Goal: Print a small forecast to the user
// 1. Print: "It is currently 58.55 degrees out. There is a 0% chance of rain."
// 2. Test your work

request({ url: url, json: true }, (error, response) => {
    const data = response.body.currently
    console.log('It is currently ' + data.temperature + ' degrees out.')
    console.log('There is a ' + data.precipProbability + '% chance of rain.')
})


