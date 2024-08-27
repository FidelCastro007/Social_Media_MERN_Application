 const User = require('../model/User')

 //GetALL USER_POST Controll
const getALLPosts = async( req, res) => {
    try{
        const posts = await User.find()
        res.json(posts)
    } catch (err){
        res.status(500).json({message: err.message})
    }
}

// Post USER_POST Controll
const createPost = async(req, res) => {
    const {id,title,datetime,body} = req.body;
    if (!title || !body) return res.status(400).json({message:'Title and Body are required'})

        const post = new User({id,title,datetime,body})
    try{
        const newPost = await post.save()
        res.status(201).json(newPost)
    } catch (err){
        console.error(err)
        res.status(500).json({"message":err.message})
    }
}

//Put USER_POST Controll
const updatePost = async(req, res) => {
    try{
        const post = await User.findOne({id: req.params.id})
        if (!post) return res.status(404).json({message: `Post ID ${req.params.id} not found`})
        
        post.title = req.body.title || post.title;
        post.datetime = req.body.datetime || post.datetime
        post.body = req.body.body || post.body

        const updatedPost = await post.save()
        res.json(updatedPost)
    } catch (err){
        res.status(500).json({message:err.message})
    }
}

//delete USER_POST Controll
const deletePost = async(req, res) => {
    try{
        const post = await User.findOneAndDelete({id:req.params.id})
        if (!post) return res.status(404).json({message:`Post ID ${req.params.id} not found`})
    
        res.json({message:`Post ID ${req.params.id} deleted`})
        } catch (err){
            res.status(500).json({message:err.message})
        }
}

//GetOne USER_POST Controll
const getPost = async(req, res) => {
    try {
        const post = await User.findOne({ id: req.params.id });
        if (!post) return res.status(404).json({ message: `Post ID ${req.params.id} not found`});
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getALLPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
}