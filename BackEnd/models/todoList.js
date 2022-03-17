const mongoose = require('mongoose');

var TodoList = mongoose.model('TodoList', {
    _id: { type: String },
    item: [{ type: String }]
})

module.exports = { TodoList };