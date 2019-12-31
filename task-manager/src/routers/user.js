const express = require('express')
const User = require('../models/user')

const router = new express.Router()

// Goal: Have signup send back auth token
// 1. Generate a token for the saved user
// 2. Send back both the token and the user
// 3. Create a new user from Postman and confirm the token is there

router.post('/users', async (request, response) => {
    const user = new User(request.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        response.status(201).send({ user, token })
    } catch (error) {
        response.status(400).send(error)

    }
})

router.post('/users/login', async (request, response) => {
    try{
        const user = await User.findByCredentials(request.body.email, request.body.password)
        const token = await user.generateAuthToken()
        response.send({ user, token })
    } catch(error) {
        response.status(400).send()
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
        const user = await User.findById(_id)
        
        updates.forEach((update) => user[update] = request.body[update])
        await user.save()
        
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