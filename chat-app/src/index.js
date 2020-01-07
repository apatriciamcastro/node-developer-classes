const express = require('express')
const path = require('path')

const app = express()

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})

// Goal: Setup scripts in package.json
// 1. Create a "start" script to start the app using node
// 2. Install nodemon as a development dependency
// 3. Create a "dev" script to start the app using nodemon
// 4. Run both scripts to test your work
