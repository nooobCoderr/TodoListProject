const mongoose = require('mongoose');

var User = mongoose.model('User', {
    _id: { type: String },
    password: { type: String }
})

module.exports = { User };