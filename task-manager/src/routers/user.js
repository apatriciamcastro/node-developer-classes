const express = require('express')
const User = require('../models/user')

// create a new router so you can separate the different routes in separate files
const router = new express.Router()

// setup the routes 
router.post('/users', async (request, response) => {
    const user = new User(request.body)

    try {
        await user.save()
        response.status(201).send(user)
    } catch (error) {
        response.status(400).send(error)

    }
})

router.get('/users', async (request, response) => {
   try {
       const users = await User.find({})
       response.send(users)
    } catch(error) {
        response.status(500).send()
    }  
})

router.get('/users/:id', async (request, response) => {
    const _id = request.params.id    

    try {
        const user = await User.findById(_id)

        if(!user){
          return response.status(404).send()
        }
        response.send(user)
    } catch(error) {
        response.status(500).send()
    }
})

router.patch('/users/:id', async(request, response) => {
    const _id = request.params.id

    const updates = Object.keys(request.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) {
        return response.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const user = await User.findByIdAndUpdate(_id, request.body, { new: true, runValidators: true })
        if(!user) {
            return response.status(404).send()
        }
        response.send(user)
    } catch(error) {
        response.status(400).send()
    }

})

router.delete('/users/:id', async(request, response) => {
    const _id = request.params.id

    try {
        const user = await User.findByIdAndDelete(_id)
        if(!user) {
            response.status(404).send()
        }
        response.send(user)
    } catch(error) {
        response.status(500).send()
    }

})

module.exports = router