const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

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

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'Rain',
        location: 'Porto'
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



app.listen(3000, () => {
    console.log('Server is up on port 3000')
})

