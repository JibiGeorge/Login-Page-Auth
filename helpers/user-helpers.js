
const mongoose = require('mongoose')
const collections = require('../config/collections')

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
},
{collection: collections.USER_COLLECTION}
)

const model = mongoose.model('userSchema', userSchema)

module.exports = model