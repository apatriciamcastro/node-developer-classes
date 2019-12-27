const mongoose = require('mongoose')
const validator = require('validator')


mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})

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

// const me = new User({
//     name: '   Pat  ',
//     email: 'MYMAIL@pat.com   ',
//     password: 'passpass    '
// })

// me.save().then(() => {
//     console.log(me)

// }).catch((error) => {
//     console.log('Error!', error)
// })


// Goal: Add validation and sanitization to task
// 1. Trim the description and make it required
// 2. Make completed optional and default it to false
// 3. Test your work with and without errors

const Task = mongoose.model('Task', {
    description:{
        type: String,
        trim: true,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const dishes = new Task ({
    description: ' Wash the dishes   '
})

dishes.save().then(() => {
    console.log(dishes)
}).catch((error) => {
    console.log('Error!', error)
})