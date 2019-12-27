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

app.get('/users', (request, response) => {
    User.find({}).then((users) => {
        response.send(users)
    }).catch((error) => {
        response.status(500).send()
    })   
})

app.get('/users/:id', (request, response) => {
    const _id = request.params.id

    User.findById(_id).then((user) => {
        if(!user) {
            return response.status(404).send()
        }
        response.send(user)
    }).catch((error) => {
        response.status(500).send()
    })   
})

app.post('/tasks', (request, response) => {
    const task = new Task(request.body)

    task.save().then(() => {
        response.status(201).send(task)
    }).catch((error) => {
        response.status(400).send(error)
    })
})

// Goal: Setup the task reading endpoints
// 1. Create an endpoint for fetching all tasks
// 2. Create an endpoint for fetching a task by its id
// 3. Setup new requests in Postman and test your work

app.get('/tasks', (request, response) => {
    Task.find({}).then((tasks) => {
        response.send(tasks)
    }).catch((error) => {
        response.status(500).send()
    })
})

app.get('/tasks/:id', (request, response) => {
    const _id = request.params.id

    Task.findById(_id).then((task) => {
        if(!task) {
            return response.status(404).send()
        }
        response.send(task)

    })
})

app.listen(port, () => {
    console.log('Server is listening on port ' + port)
})

