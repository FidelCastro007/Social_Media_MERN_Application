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
//app.use(express.static(path.join(__dirname, 'src'))) // Serve static files from the 'src' directory

connectDB();

// Serve react app
/*app.get("/", async(req,res) =>{
    res.sendFile(path.join(__dirname,'src','index.js'))
    }
)*/
//Routes

//Get USER_POST Route
app.use('/api/posts',require('./Router/routePost'))

/* // Post USER_POST Route
app.post('/api/posts', async(req, res) =>{
    const {id,title,datetime,body} = req.body;
    if (!title || !body) return res.status(400).json({message:'Title and Body are required'})

        const post = new User({id,title,datetime,body})
    try{
        const newPost = await post.save()
        res.status(201).json(newPost).send({ "message":"User Posted Successfully"})
    } catch (err){
        console.error(err)
        res.status(500).json({"message":err.message})
    }
})

//Put USER_POST Route
app.put('/api/posts/:id', async(req,res) => {
    try{
        const post = await User.findOne({id: req.params.id})
        if (!post) return res.status(404).json({message: 'Page Not Found'})
        
        post.title = req.body.title || post.title;
        post.datetime = req.body.datetime || post.datetime
        post.body = req.body.body || post.body

        const updatedPost = await post.save()
        res.json(updatedPost)
    } catch (err){
        res.status(500).json({message:err.message})
    }
})

//delete USER_POST Route
app.delete('/api/posts/:id', async (req, res) => {
    try{
    const post = await User.findOneAndDelete({id:req.params.id})
    if (!post) return res.status(404).json({message:"Post not found"})

    res.json({message:"Post deleted"})
    } catch (err){
        res.status(500).json({message:err.message})
    }
})
 */
// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})