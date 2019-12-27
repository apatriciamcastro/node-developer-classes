// CRUD: Create, Read, Update, Delete

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID
const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true } , (error, client) => {
    if(error) {
       return console.log('Unable to connect to database.')
    }
    
   const db = client.db(databaseName)

//    db.collection('users').findOne({ _id: new ObjectID("5e05c90b50fe6626a7a7a3b5") }, (error, user) => {
//        if(error) {
//            return console.log('Unable to fetch user.')
//        }
//        console.log(user)
//    })

//    db.collection('users').find({age:27}).toArray((error, users) => {
//        console.log(users)
//    })
//    db.collection('users').find({age:27}).count((error, users) => {
//     console.log(users)
// })

// Goal: Use find and findOne with tasks
// 1. Use findOne to fetch the last task by its id (print doc to console)
// 2. Use find to fetch all tasks that are not completed (print docs to console)
// 3. Test your work!

    db.collection('tasks').findOne({ _id: new ObjectID("5e05caabe4ad2a2884173b37") }, (error, task) => {
        console.log(task)
    })

    db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
        console.log(tasks)
    })

})