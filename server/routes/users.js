const router = require('express').Router();
let Users = require('../models/users.model');

router.route('/:name').get((req,res) =>{
    Users.find({userName:req.params.name})
    .then(user=> res.json(user))
    .catch(err=>res.status(400).json('Error getting user: ' + err));
});

router.route('/add').post((req,res) =>{
    const userName = req.body.userName;
    const newUser = new Users({
        userName
    });

    newUser.save()
    .then((user)=> res.json(user))
    .catch(err=>res.status(400).json('Error adding user ' + err));
});


module.exports = router;