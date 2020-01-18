const { getDb } = require('../scripts/connection.js');
const Post = require('../models/post');
async function add(_,{ post })
{	        
    const newPost = new Post({
        title:post.title,    
        description:post.description    
    });      
    if(post.url !== undefined)
    {
        newPost.url = post.url;
    }
    const result = await newPost.save();
    const savedPost = await Post.findOne({ _id: result.insertedId });
    const count = await Post.countDocuments({});    
    return {"count":count};
}

async function list()
{    	
    const posts = await Post.find({});
    return posts;
}


async function byId(_, { id })
{	
    const post = await Post.findOne({ _id:id });
    return post;
}

module.exports = { add, list, byId };