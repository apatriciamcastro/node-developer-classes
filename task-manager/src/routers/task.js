const express = require('express')
const Task = require('../models/task')

const router = new express.Router()

router.post('/tasks', async (request, response) => {
    const task = new Task(request.body)

    try {
        await task.save()
        response.status(201).send(task)
    } catch(error) {
        response.status(400).send(error)
    }
})

router.get('/tasks', async (request, response) => {
    try {
        const tasks = await Task.find({})
        response.send(tasks)
    } catch(error) {
        response.status(500).send()
    }
})

router.get('/tasks/:id', async (request, response) => {
    const _id = request.params.id

    try {
        const task = await Task.findById(_id)
        if(!task) {
            return response.status(404).send()
        }
        response.send(task)
    } catch(error) {
        response.status(500).send()        
    }
})

// Goal: Change how tasks are updated
// 1. Find the task
// 2. Alter the task properties
// 3. Save the task
// 4. Test by updating a task from Postman

router.patch('/tasks/:id', async (request, response) => {
    const _id = request.params.id

    const updates = Object.keys(request.body)
    const allowedUpdates = ['description', 'completed']

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) {
        return response.status(400).send({ error: 'Invalid update!' })
    }

    try {
        const task = await Task.findById(_id)

        updates.forEach((update) => task[update] = request.body[update])
        await task.save()

        if(!task) {
            return response.status(404).send()
        }
        response.send(task)
    } catch(error) {
        response.status(400).send()
    }
})

router.delete('/tasks/:id', async (request, response) => {
    const _id = request.params.id

    try {
        const task = await Task.findByIdAndDelete(_id)
        if(!task) {
            return response.status(404).send()
        }
        response.send(task)
    } catch (error) {
        response.status(500).send()
    }
})

module.exports = router