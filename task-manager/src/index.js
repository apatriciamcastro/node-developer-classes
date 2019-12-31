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

const jwt = require('jsonwebtoken')

const myFunction = async () => {
    
    // create the token
    const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse', { expiresIn: '7 days' })


    // make sure the user is authenticated correctly
    const data = jwt.verify(token, 'thisismynewcourse')
   
  
}

myFunction()
