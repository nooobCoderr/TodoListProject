var express = require('express');
var bodyParser = require('body-parser');
var userController = require('./controllers/userController');
var todoController = require('./controllers/todoListController');
const cors = require('cors');

var app = express();

const { mongoose } = require('./db');

app.use(bodyParser.json());
app.use(cors({origin: "http://localhost:4200"}));

app.use('/users', userController);
app.use('/todo', todoController);

app.listen(3200, (req, resp)=>{
    console.log("Server started at Port 3200");
})