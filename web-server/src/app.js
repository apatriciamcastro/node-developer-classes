const path = require('path')
const express = require('express')
const hbs = require('hbs')

// Goal: Create a partial for the footer
// 1. Setup the template for the footer partial "Created by..."
// 2. Render the partial at the bottom of all three pages
// 3. Test your work by visiting all three pages

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

// Goal: Create a template for help page
// 1. Setup a help template to render a help message to the screen
// 2. Setup the help route and render the template with an example message
// 3. Visit the route in the browser and see your help message print

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

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})

