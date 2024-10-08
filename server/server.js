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
app.use(cors({
  origin: 'https://social-media-mern-i5f4.onrender.com', // Allow your frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods if needed
  credentials: true, // If you need to send cookies or authentication information
}));

// CSP Middleware
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", 
    "default-src 'self'; " +
    "connect-src 'self' https://www.google-analytics.com; " +
    "script-src 'self' https://www.google-analytics.com; " +
    "img-src 'self' https://www.google-analytics.com; " +
    "style-src 'self' 'unsafe-inline';"
  );
  next();
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

connectDB();

//Routes

//Get USER_POST Route
app.use('/api/posts',require('./Router/routePost'))

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
