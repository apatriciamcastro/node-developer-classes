const mongoose = require('mongoose')

// Goal: Refactor task model to add timestamps
// 1. Explicitly create schema
// 2. Setup timestamps
// 3. Create tasks from postman to test

const taskSchema = new mongoose.Schema({
    description:{
        type: String,
        trim: true,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
},{
    timestamps: true  
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task