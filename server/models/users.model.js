const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true, // trim the whitespace
    },
}, {
    timestamps: true, // automatically save when it's created
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;