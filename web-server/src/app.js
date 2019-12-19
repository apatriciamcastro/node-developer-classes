const path = require('path')
const express = require('express')

const app = express()
app.set('view engine', 'hbs')

app.use(express.static(path.join(__dirname, '../public')))

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

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'Rain',
        location: 'Porto'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})

// Goal: Create a template for help page
// 1. Setup a help route and render the template with an example message
// 2. Setup the help route and render the template with an example message
// 3. Visit the route in the browser and see your help message print