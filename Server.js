var actions = require('./actions');
var connection = require('./connections');
var mongoose = require('./model/product');
var express = require('express');
var bodyparser = require('body-parser');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var cors = require('cors');
var httpserver = require('http').createServer(app);
var socketServer = require('socket.io');
var io=socketServer.listen(httpserver,{ origins: '*:*'});

app.use(cors({origin: "*"}));
app.use(express.static('./public'));
app.use(bodyparser.urlencoded({extended:false}));
app.set('view engine','ejs');

mongoose.db.connection.once('open',()=>{
    console.log('mongo connected');
        io.on('connection', function(client) {
            connection(client,io,mongoose.product);
        });
        actions(app,mongoose.product);
    }).on('error',(err)=>{
        console.log('connection error');
    });

// MongoClient.connect("mongodb://localhost:27017", function (err, db) {
//     if(err) throw err;
//     console.log("mongo connected");
//     var dbo = db.db("prodb");
    
// });
httpserver.listen(3000,()=>{
    console.log("server started");
  });