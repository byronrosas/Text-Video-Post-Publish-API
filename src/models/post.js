const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title:  String,
    url:{ type:String, required:false },
    description:String     
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;

