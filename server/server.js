const express = require('express')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const connectDB = require('./config/db')
const User = require('./model/User')
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 5000;
console.log('Port:', process.env.PORT);

//Middleware
app.use(bodyParser.json());
app.use(cors());

connectDB();

//Routes

//Get USER_POST Route
app.use('/api/posts',require('./Router/routePost'))

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
