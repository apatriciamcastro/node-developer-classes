const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(path.join(publicDirectoryPath)))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ana Castro'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Ana Castro'
    } )
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Ana Castro',
        message: 'For help info, please contact system admin.'
    })
})

// Goal: Wire up /weather
// 1. Require geocode/forecast into app.js
// 2. Use the address to geocode
// 3. Use the coordinates to get forecast
// 4. Send back the real forecast and location

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            errorMessage: 'You must provide an address.'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location}) => {
        if(error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })

        })

    })

   })

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            errorMessage: 'You must provide a search term.'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help Page',
        name: 'Ana Castro',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'Ana Castro',
        errorMessage: 'Page not found.'
    })
})

// Goal: Create and render a 404 page with handlebars
// 1. Setup the template to render the header and footer
// 2. Setup the template to render an error message in a paragraph
// 3. Render the template for both 404 routes
//  - Page not found.
//  - Help article not found.
// 4. Test your work. Visit /what and /help/units



app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

