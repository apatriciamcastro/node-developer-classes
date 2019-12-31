const express = require('express')
require('./db/mongoose')
const userRouter = require ('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

// app.use((request, response, next) => {
//     if(request.method === 'GET') {
//         response.send('GET requests are disabled')
//     } else {
//         next()
//     }         
// })

// app.use((request, response, next) => {
//     response.status(503).send('The site is under maintenance. Please try again later.')
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is listening on port ' + port)
})

const Task = require('./models/task')
const User = require('./models/user')

const main = async () => {
    // const task = await Task.findById('5e0b569e87be3c69cb388663')
    // // to find the user who's associated with this task 
    // await task.populate('owner').execPopulate()
    // console.log(task.owner)

    const user = await User.findById('5e0b556f8e1e9a68e5341564')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)
}

main()