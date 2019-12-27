const mongoose = require('mongoose')
const validator = require('validator')


mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})

// Goal: Add a password field to user
// 1. Setup the field as a required string
// 2. Ensure the length is greater than 6
// 3. Trim the password
// 4. Ensure that password does not contain "password"
// 5. Test your work

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if(value.toLowerCase.includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }

    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if(value < 0) {
                throw new Error('Age must be a positive number.')
            }

        }
    }
})

const me = new User({
    name: '   Pat  ',
    email: 'MYMAIL@pat.com   ',
    password: 'passpass    '
})

me.save().then(() => {
    console.log(me)

}).catch((error) => {
    console.log('Error!', error)
})


const Task = mongoose.model('Task', {
    description:{
        type: String
    },
    completed: {
        type: Boolean
    }
})

// const dishes = new Task ({
//     description: 'Wash the dishes',
//     completed: false
// })

// dishes.save().then(() => {
//     console.log(dishes)
// }).catch((error) => {
//     console.log('Error!', error)
// })