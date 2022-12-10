const mongoose = require('mongoose');

const UserPost = mongoose.model('UserPost', {
    message: String,
});

module.exports = UserPost;