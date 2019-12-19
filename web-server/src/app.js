const express = require('express')

const app = express()

/**
 * Configure what the server should do when someone tries
 * to get the resource at a specific URL 
 */

// app.com
app.get('', (req,res) => {
    res.send('Hello Express')
})

// app.com/help
app.get('/help', (req, res) => {
    res.send('Help Page')
})

// Goal: Setup two new routes
// 1. Setup an about route and render a page title
// 2. Setup a weather route and render a page title
// 3. Test your work by visiting both in the browser

// app.com/about
app.get('/about', (req, res) => {
    res.send('About Page')
})

// app.com/weather
app.get('/weather', (req, res) => {
    res.send('Weather Page')
})

// To start up the server
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})