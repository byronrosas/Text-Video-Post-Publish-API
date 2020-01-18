require('dotenv').config({ path: './sample.env' });
const mongoose = require('mongoose');


let db;

function connectDB() {
    const url = process.env.DB_URL || 'mongodb://localhost:27017/text_video_blog_db';
    
    mongoose.connect(url, {useNewUrlParser: true});
    // Get Mongoose to use the global promise library
    mongoose.Promise = global.Promise;
    //Get the default connection
    db = mongoose.connection;        
}

function getDB() {
    return db;
}

module.exports = { connectDB, getDB };