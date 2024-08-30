const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id:{
        type: Number,
        unique: true
    },
    title:{
        type: String,
        required: true
    },
    datetime:{
        type: String
    },
    body:{
        type: String,
        required: true
    }
}) 

module.exports = mongoose.model('usersdatas', userSchema)
