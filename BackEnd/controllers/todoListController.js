const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { TodoList } = require('../models/todoList');

router.get('/', (req, resp)=>{
    TodoList.find((err, docs)=>{
        if(!err){
            resp.send(docs);
        }else{
            console.log("Error retrieving TodoList : "+ JSON.stringify(err, undefined, 2))
        }
    })
})


router.post('/', (req,resp)=>{
    var listItem = new TodoList({
        _id: req.body._id,
        item: req.body.item
    });
    listItem.save((err, doc)=>{
        if(!err){
            resp.send(doc)
        }else{
            console.log("Error posting List Item : "+ JSON.stringify(err, undefined, 2))
        }
    })
})

router.put('/:id', (req, resp)=>{
    var listItem = new TodoList({
        _id: req.body._id,
        item: req.body.item
    });
    TodoList.findByIdAndUpdate(req.params.id, {$set : listItem }, { new : false }, (err, doc)=>{
        console.log(doc);
        if(!err){
            resp.send(doc);
        }
        else{
            console.log("Error Updating Data : "+ JSON.stringify(err, undefined, 2))
        }
    })
})

router.delete('/:id', (req,resp)=>{
    TodoList.findByIdAndRemove(req.params.id, (err, doc)=>{
        if(!err){
            resp.send(doc)
        }
        else{
            console.log("Error Deleting Data : "+ JSON.stringify(err, undefined, 2))
        }
    })
})

module.exports = router