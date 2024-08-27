const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true
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