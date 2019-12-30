// Goal: Mess around with promise chaining
// 1. Create promise-chaining-2.js
// 2. Load in mongoose and task model
// 3. Remove a given task by id
// 4. Get and print the total number of incomplete tasks
// 5. Test your work

require('../src/db/mongoose')
const Task = require('../src/models/task')

Task.findByIdAndDelete('5e05f41fbca2474da1247c60').then(() => {
    return Task.countDocuments( { completed: false })
}).then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
})