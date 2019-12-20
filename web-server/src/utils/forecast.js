const request = require ('request')

const forecast = (latitude,longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/9a0bf19a7ea34b1fa05df9e14ff1709e/'+ latitude + ',' + longitude +'?units=si'

    request({ url, json: true }, (error, { body }) => {
        if(error){
            callback('Unable to connect to weather services.')
        } else if(body.error) {
            callback('Unable to find location. Try again.')
        } else {
            callback(undefined,
                body.daily.data[0].summary +
                'It is currently ' + body.currently.temperature +
                ' degrees outside. There is a ' +
                body.currently.precipProbability +
                '% chance of rain.'           
            )
        }
    })
}
module.exports = forecast
