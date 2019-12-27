const express = require('express')

// this ensures the file runs and that Mongoose connects to the DB, without grabing anything from the file
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

/*
    to automatically pass incoming JSON to an object
    so it can be accessed in the request handlers
*/
app.use(express.json())

app.post('/users', (request, response) => {
    const user = new User(request.body)

    user.save().then(() => {
        response.status(201).send(user)
    }).catch((error) => {
        response.status(400).send(error)

    })
})

// Goal: Setup the task creation endpoint
// 1. Create a separate file for the task model (load it into index.js)
// 2. Create the task creation endpoint (handle success and error)
// 3. Test the endpoint from postman with good and bad data

app.post('/tasks', (request, response) => {
    const task = new Task(request.body)

    task.save().then(() => {
        response.status(201).send(task)
    }).catch((error) => {
        response.status(400).send(error)
    })
})

app.listen(port, () => {
    console.log('Server is listening on port ' + port)
})

