require('../src/db/mongoose')
const Task = require('../src/models/task')


/* Task.findByIdAndDelete('5e05f41fbca2474da1247c60').then(() => {
    return Task.countDocuments( { completed: false })
}).then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
}) */

// Goal: Use async/await
// 1. Create deleteTaskAndCount as an async function
//      - Accept id of task to remove
// 2. Use await to delete task and count up incomplete tasks
// 3. Return the count
// 4. Call the function and attach then/catch to log results
// 5. Test your work


const deleteTaskAndCount = async (taskId) => {
    const task = await Task.findByIdAndDelete(taskId)
    const count = await Task.countDocuments( { completed: false })
    return count
}

deleteTaskAndCount('5e05fd62f745e255bdc81155').then((count) => {
    console.log(count)
}).catch((error) => {
    console.log(error)
})