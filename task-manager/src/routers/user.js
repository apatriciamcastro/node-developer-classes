const express = require('express')
const multer = require('multer')
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

router.patch('/users/me', auth, async(request, response) => {
    const updates = Object.keys(request.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) {
        return response.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updates.forEach((update) => request.user[update] = request.body[update])
        await request.user.save()
        response.send(request.user)
    } catch(error) {
        response.status(400).send()
    }

})

router.delete('/users/me', auth, async (request, response) => {
    const _id = request.user._id

    try {
        await request.user.remove()
        response.send(request.user)
    } catch(error) {
        response.status(500).send()
    }
})

// Goal: Setup endpoint for avatar upload
// 1. Add POST /users/me/avatar to user router
// 2. Setup multer to store uploads in an avatars directory
// 3. Choose name "avatar" for the key when registering the middleware
// 4. Send back a 200 response from route handler
// 5. Test by creating a new Task App request and upload image

const upload = multer({
    dest: 'avatars'
})

router.post('/users/me/avatar', upload.single('avatar'), (request, response) => {
    response.send()
})

module.exports = router