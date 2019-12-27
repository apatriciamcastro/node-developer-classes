// CRUD: Create / Read / Update / Delete
//       insert / find / update 

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true } , (error, client) => {
    if(error) {
       return console.log('Unable to connect to database.')
    }
    
   const db = client.db(databaseName)

    // db.collection('users').updateOne({
    //     _id: new ObjectID('5e05c90b50fe6626a7a7a3b6')
    // }, {
    //     $inc: {
    //         age: 3
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // Goal: Use updateMany to complete all tasks
    // 1. Check the documentation for updateMany
    // 2. Setup the call with the query and the updates
    // 3. Use promise methods to setup the success/error handlers
    // 4. Test your work!

    db.collection('tasks').updateMany({completed: false}, {
        $set: {
            completed: true
        }
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })



})
    