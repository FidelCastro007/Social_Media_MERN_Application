const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id:{
        type: Number,
        required: true,
        unique: true
    },
    title:{
        type: String,
        required: true
    },
    datetime:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    }
}) 

module.exports = mongoose.model('usersData', userSchema)
