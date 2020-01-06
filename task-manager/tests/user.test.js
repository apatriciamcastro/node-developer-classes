const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')

const userOne = {
    name: 'Mike',
    email: 'mike@example.com',
    password: '56what!!'
}

beforeEach(async () => {
    await User.deleteMany()
    await new User(userOne).save()
})

test('Should signup a new user', async() => {
    await request(app).post('/users').send({
        name: 'Patricia Castro',
        email: 'apatriciamcastro@gmail.com',
        password: 'Test97!'
    }).expect(201)
})

test('Should login existing user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
})

// Goal: Test login failure
// 1. Create "Should not login nonexistent user"
// 2. Send off the request with bad credentials
// 3. Expect the correct status response
// 4. Test your work
test('Should not login nonexistent user', async () => {
    await request(app).post('/users/login').send({
        email: 'mik@example.com',
        password: userOne.password
    }).expect(400)
})