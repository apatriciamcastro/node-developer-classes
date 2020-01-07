// Goal: Create an Express web server
// 1. Initialize npm and install Express
// 2. Setup a new Express server
//      - Serve up the public directory
//      - Listen on port 3000
// 3. Create index.html and render "Chat App" to the screen
// 4. Test your work: Start the server and view the page in the browser

const express = require('express')
const path = require('path')

const app = express()

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})
