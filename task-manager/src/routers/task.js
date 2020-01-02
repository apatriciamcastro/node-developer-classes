const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')

const router = new express.Router()

router.post('/tasks', auth, async (request, response) => {
     const task = new Task({
        ...request.body,
        owner: request.user._id
    })

    try {
        await task.save()
        response.status(201).send(task)
    } catch(error) {
        response.status(400).send(error)
    }
})

// Goal: Setup support for skip
// 1. Setup "skip" option
//      - Parse query value to integer
// 2. Fire off some requests to test it's working
//      - Fetch the 1st page of 2 and then the 3rd page of 2
//      - Fetch the 1st page of 3 and then the 2nd page of 3

router.get('/tasks', auth, async (request, response) => {
    const match = {}
    
    if(request.query.completed) {
        match.completed = request.query.completed === 'true'
    }

    try {
        await request.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(request.query.limit),
                skip: parseInt(request.query.skip)
            }
        }).execPopulate()
        response.send(request.user.tasks)
    } catch(error) {
        response.status(500).send()
    }
})

router.get('/tasks/:id', auth, async (request, response) => {
    const _id = request.params.id

    try {
        const task = await Task.findOne({ _id, owner: request.user._id })
        if(!task) {
            return response.status(404).send()
        }
        response.send(task)
    } catch(error) {
        response.status(500).send()        
    }
})

router.patch('/tasks/:id', auth, async (request, response) => {
    const _id = request.params.id

    const updates = Object.keys(request.body)
    const allowedUpdates = ['description', 'completed']

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) {
        return response.status(400).send({ error: 'Invalid update!' })
    }

    try {
        const task = await Task.findOne({ _id, owner: request.user._id })

        
        if(!task) {
            return response.status(404).send()
        }
        updates.forEach((update) => task[update] = request.body[update])
        await task.save()

        response.send(task)
    } catch(error) {
        response.status(400).send()
    }
})

router.delete('/tasks/:id', auth, async (request, response) => {
    const _id = request.params.id

    try {
        const task = await Task.findOneAndDelete({ _id, owner: request.user._id })

        if(!task) {
            return response.status(404).send()
        }
        response.send(task)
    } catch (error) {
        response.status(500).send()
    }
})

module.exports = router