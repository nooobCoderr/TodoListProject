const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { User } = require('../models/user');

router.get('/', (req, resp)=>{
    User.find((err, docs)=>{
        if(!err){
            resp.send(docs);
        }else{
            console.log("Error retrieving Users : "+ JSON.stringify(err, undefined, 2));
        }
    })
})

router.get('/:email/:pwd', (req,resp)=>{
    console.log("Email is: "+req.params.email);
    console.log("Password is: "+req.params.pwd);
    User.findById(req.params.email, (err, doc)=>{
        if(!err){
            if(doc){
                if(doc.password == req.params.pwd) {
                    resp.send(doc);
                }
                else resp.send(null);
            }
            else resp.send(null);
        }
        else{
            console.log("Error retrieving User : "+ JSON.stringify(err, undefined, 2));
        }
    })
})

router.post('/', (req,resp)=>{
    var user = new User({
        _id: req.body._id,
        password: req.body.password
    });
    User.findById(req.body._id, (err, doc)=>{
        console.log(" Doc is: "+doc);
        if(doc){
            console.log("It will enter error");
            resp.send(null);
        }
        else{
            user.save((err1, doc1)=>{
                if(!err1){
                    resp.send(doc1);
                }else{
                    console.log("Error retrieving Users : "+ JSON.stringify(err1, undefined, 2));
                }
            })
        }
    })
})

router.delete('/:id', (req,resp)=>{
    User.findByIdAndRemove(req.params.id, (err, doc)=>{
        if(!err){
            resp.send(doc)
        }
        else{
            console.log("Error Deleting Data : "+ JSON.stringify(err, undefined, 2))
        }
    })
})

module.exports = router