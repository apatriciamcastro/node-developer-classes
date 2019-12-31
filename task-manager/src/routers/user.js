const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')

const router = new express.Router()

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

router.post('/users/logout', auth, async (request, response) => {
    try {
        request.user.tokens = request.user.tokens.filter((token) => {
            return token.token !== request.token
        })
        await request.user.save()

        response.send()
    } catch(error) {
        response.status(500).send()
    }
})

// Goal: Create a way to logout of all sessions
// 1. Setup POST /users/logoutAll
// 2. Create the router handler to wipe the tokens array
//      - send 200 or 500
// 3. Test your work
//      - Login a few times and logout of all. Check database

router.post('/users/logoutAll', auth, async (request, response) => {
    try {
        request.user.tokens = []
        await request.user.save()
        response.send()

    } catch(error) {
        response.status(500).send()
    }
})



router.get('/users/me', auth, async (request, response) => {
    response.send(request.user)
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