const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/TodoListAppDB',(err)=>{
    if(!err)
        console.log("Mongo DB connected Successfully");
    else
        console.log("Error while connecting to Mongo DB : "+ err);
})

module.exports = mongoose;