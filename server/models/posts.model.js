const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    userID: {type:String,required:true},
    feeling: {type: String, required: true},
    content: {type: String, required: true},
    date: {type: Date, required:true}
},{
    timestamps: true, // automatically save when it's created
});

const Post = mongoose.model('Post',postSchema);

module.exports = Post;