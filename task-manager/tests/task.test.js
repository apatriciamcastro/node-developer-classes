const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task')
const {
    userOneId,
    userOne,
    userTwo,
    taskOneId,
    setupDatabase
} = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description:'From my test'
        })
        .expect(201)

        const task = await Task.findById(response.body._id)
        expect(task).not.toBeNull()
        expect(task.completed).toBe(false)
})


// Goal: Test GET /tasks
// 1. Request all tasks for user one
// 2. Assert the correct status code
// 3. Check the length of the response array is 2
// 4. Test 

test('Should get all tasks of a user', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    expect(response.body.length).toEqual(2)
})

// Goal: Test delete task security
// 1. Attempt to have the second user delete the first task (should fail)
//      - Setup necessary exports from db.js
// 2. Assert the failed status code
// 3. Assert the task is still in the database
// 4. Test your work

test('Should not delete task from other user', async () => {
    const response = await request(app)
        .delete(`/tasks/${taskOneId}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(500)

        const task = await Task.findOne(response.body.id, response.body.owner)
        expect(task).not.toBeNull()
})