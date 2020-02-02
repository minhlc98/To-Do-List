const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = Schema({
    name: {
        firstName: String,
        lastName: String
    },
    email: String,
    password: String,
    isActivated: {
        type: Boolean,
        default: false
    },
    activateCode: String,
    createAt: {
        type: Date,
        default: Date.now
    }
})
const taskSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: String
})
const User = mongoose.model('User', userSchema)
const Task = mongoose.model('Task', taskSchema)
module.exports = { User, Task }