// CRUD: Create, Read, Update, Delete

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true } , (error, client) => {
    if(error) {
       return console.log('Unable to connect to database.')
    }
    
   const db = client.db(databaseName)
//    db.collection('users').insertOne({
//        name: 'Patricia',
//        age: 27
//    }, (error, result) => {
//        if(error) {
//            return console.log('Unable to insert user.')
//        }

//        console.log(result.ops)

//    })
    // db.collection('users').insertMany([
    //     {
    //         name: 'Ana',
    //         age: 28
    //     },
    //     {
    //         name: 'Gunther',
    //         age: 27
    //     }
    // ], (error, result) => {
    //     if(error) {
    //        return console.log('Unable to insert documents.')
    //     }

    //     console.log(result.ops)

    // })


    // Goal: Insert 3 tasks into a new tasks collection
    // 1. Use insertMany to insert the documents
    //      - description (string), completed (boolean)
    // 2. Setup the callback to handle error or print ops
    // 3. Run the script
    // 4. Refresh the database in Robo 3T and view data in tasks collection

    db.collection('tasks').insertMany([
        {
            description: 'Wash dishes',
            completed: false
        },
        {
            description: 'Vaccum floors',
            completed: false
        },
        {
            description: 'Cook dinner',
            completed: true
        }
    ], (error, result) => {
        if(error) {
            return console.log('Unable to insert tasks.')
        }

        console.log(result.ops)

    })

})