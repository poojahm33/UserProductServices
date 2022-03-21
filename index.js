const express = require('express');
const mongoose = require('mongoose');
const Bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');

const app = express();

const {User} = require('./models/mongoschema');
const {Product} = require('./models/mongoschema');

//mongoose connection to the database
// mongoose.connect('mongodb+srv://poojahm:Kolimotte%233*@cluster0.65w0i.mongodb.net/Users?retryWrites=true&w=majority');
// mongoose.Promise = global.Promise;        
mongoose.connect('mongodb+srv://poojahm:Kolimotte%233*@cluster0.65w0i.mongodb.net/Users?retryWrites=true&w=majority');
mongoose.Promise = global.Promise;
var db = mongoose.connection ;

db.on('connected',function(){
    console.log("Mongoose default connection done");
});
db.on('error',function(err){
    console.log("Mongoose default connection error" + err);
});
app.use(bodyParser.urlencoded({extended : true}));

app.use(express.static('public'));

app.use(express.json());
// initialize routes
app.use('/api',require('./routes/api'));
app.set("view engine", "ejs"); //this is required to use ejs files

// error handling middleware
app.use(function(err,req,res,next){
    //console.log(err);
    res.status(422).send({error: err.message});
});



app.listen(process.env.port || 7000, function(){
    console.log('Ready to Go!');
});