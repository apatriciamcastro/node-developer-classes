const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = require('../src/app')
const User = require('../src/models/user')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Mike',
    email: 'mike@example.com',
    password: '56what!!',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}

beforeEach(async () => {
    await User.deleteMany()
    await new User(userOne).save()
})

test('Should signup a new user', async() => {
    const response = await request(app).post('/users').send({
        name: 'Patricia Castro',
        email: 'apat@gmail.com',
        password: 'Test97!'
    }).expect(201)

    // assert that the database was changed correctly
    // (there is a new user with the same ID as the one we're getting back in the response body)
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // assertions about the response
    expect(response.body).toMatchObject({
        user: {
            name: 'Patricia Castro',
            email: 'apat@gmail.com'
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('Test97!')
})

test('Should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
    const user = await User.findById(userOneId)

    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login nonexistent user', async () => {
    await request(app).post('/users/login').send({
        email: 'mik@example.com',
        password: userOne.password
    }).expect(400)
})

test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get profile for unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Should delete account for user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200) 
    const user = await User.findById(userOneId)
    
    expect(user).toBeNull()

})

test('Should not delete account for unauthenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)  
})

test('Should upload avatar image', async () => {
    await request(app)
    .post('/users/me/avatar')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar', 'tests/fixtures/profile-pic.jpg')
    .expect(200)

    const user = await User.findById(userOneId)

    expect(user.avatar).toEqual(expect.any(Buffer))
})

// Goal: Test user updates
// 1. Create "Should update valid user fields"
//  - Update the name of the test user
//  - Check the data to confirm it's changed
// 2. Create "Should not update invalid user fields"
//  - Update a "location" field and expect error status code
// 3. Test

test('Should update valid user fields', async () => {
    await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        name: 'Andrew'
    }).expect(200)

    const user = await User.findById(userOneId)
    expect(user.name).toBe('Andrew')
})

test('Should not update invalid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: 'Porto'
        }).expect(400)
})