const request = require('supertest')
const app = require('../src/app')

test('Should signup a new user', async() => {
    await request(app).post('/users').send({
        name: 'Patricia Castro',
        email: 'pcastro@example.com',
        password: 'Test97!'
    }).expect(201)
})