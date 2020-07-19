const router = require('express').Router();
let Post = require('../models/posts.model');

router.route('/:userID').get((req, res) => {
    Post.find({userID:req.params.userID})
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('Error loading posts') + err);
});

router.route('/add').post((req, res) => {
    const feeling = req.body.feeling;
    const content = req.body.content;
    const date = req.body.date;
    const userID = req.body.userID;
    const newPost = new Post({
        userID,
        feeling,
        content,
        date
    });

    newPost.save()
        .then(post => res.json(post))
        .catch(err => res.status(400).json('Error adding a new post' + err));
});

router.route('/update').put((req, res) => {
    const feeling = req.body.feeling;
    const content = req.body.content;
    const date = req.body.date;
    const postID = req.body.postID;
    const changedPost = {date:date,content:content,feeling:feeling};
    Post.findByIdAndUpdate(postID,changedPost)
    .then(()=>res.json(changedPost))
    .catch(err => res.status(400).json('Error updating the post' + err));
});

router.route('/:id').delete((req, res) => {
    Post.findByIdAndDelete(req.params.id)
        .then(() => res.json('Post deleted.'))
        .catch(err => res.status(400).json('Error deleting the post: ' + err));
});

router.route('/filter').put((req,res)=>{
    const date = req.body.date;
    const time = date.slice(0,10);
    console.log(time);
    console.log(req.body.id);
    Post.find({$and:[{date: {$regex: new RegExp('^' + time)}},{userID:req.body.id}]})
    .then(result => {
        res.json(result);
        console.log(result);
    })
    .catch(err=> {
        console.log(err);
        res.status(400).json('error in filtering');
    })
})

module.exports = router;

