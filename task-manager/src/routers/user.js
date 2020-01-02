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

const upload = multer({
    dest: 'avatars',
    limits: {
        fileSize: 1000000
    },
    fileFilter(request, file, callback) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
           return callback(new Error('Please upload an image.'))
        }
        callback(undefined, true)
    }
})

// Goal: Clean up error handling
// 1. Setup an error handler function
// 2. Send back a 400 with the error message
// 3. Test your work

router.post('/users/me/avatar', upload.single('avatar'), (request, response) => {
    response.send()
}, (error, request, response, next) => {
    response.status(400).send({ error: error.message })
})

module.exports = router