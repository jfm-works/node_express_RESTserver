'use strict';

const helmet = require('helmet');
const express = require('express');
const crypto = require('crypto');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
// app.use(
//     helmet({
//       contentSecurityPolicy: false,
//     })
//   );
app.use(express.static('views'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// // DB
// mongoose.connect('mongodb://localhost:27017/db', {useNewUrlParser: true});

// var Schema = mongoose.Schema;

// var UserSchema = new Schema({
//  name: String,
//  age: Number,
//  date: {
//   default: Date.now,
//   type: Date,
//  }
// });
// var UserModel = mongoose.model('users', UserSchema);

// var user = new UserModel();
// user.name = 'ohira';
// user.age = 34;
// user.save();


//Import the mongoose module

//Set up default mongoose connection
const mongoDB = 'mongodb://127.0.0.1/db';
mongoose.connect(mongoDB);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Define a schema
var Schema = mongoose.Schema;

const UserModelSchema = new Schema({
  name: String,
  pw: String
});

var UserModel = mongoose.model('UserModel', UserModelSchema );

var user = new UserModel();
user.name = 'ohira';
user.age = 34;
user.save();

const expiryDate = new Date(Date.now() + 60 * 60 * 1000 * 24 * 30);


app.get('/', function(req, res) {
    console.log("cookie",req.cookies);
    if (typeof req.cookies.user_id === "undefined") {
        console.log("render login page");
        res.render('login.ejs');
    }else{
        console.log("render index page");
        res.render('index.ejs', { csrfToken: req.cookies.token });
    }
});
// app.post('/', function(req, res) {
//     const response = req;//'{"res":"post"}';
//     console.log(req);
//     res = response;
// });
// app.put('/', function(req, res) {
//     const response = '{"res":"put"}';
//     res.json(response);
// });
// app.delete('/', function(req, res) {
//     const response = '{"res":"delete"}';
//     res.text(response);
// });


app.post('/login', function(req, res) {
    console.log("/login req.body:",req.body);
    const input_id = req.body.id;
    const input_pw = req.body.pw;
    // const token = crypto.randomUUID();
    if (dbdata[input_id] == "undefined") {
        console.log(dbdata[input_id],"is undefined");
        res.render('login.ejs');
    }
    if (dbdata[input_id].pw === input_pw) {
        console.log("login success");
        const token = crypto.randomUUID();
        res.cookie("user_id", input_id ,{
            // secure: true,
            sameSite: true,
            httpOnly: true,
            expires: expiryDate
        });
        res.cookie("token", token ,{
            // secure: true,
            sameSite: true,
            httpOnly: true,
            expires: expiryDate
        });
        res.render('index.ejs', { csrfToken: token });
    }else{
        console.log(dbdata[input_id].pw,input_pw,"unmatch");
        // return res.send("login failed");
    }
});

app.post('/logout', function(req, res) {
    res.clearCookie("user_id");
    res.clearCookie("token");
    res.render("login.ejs");
});

app.post('/login_fetch', function(req, res) {
    console.log("/login req.body:",req.body);
    const input_id = req.body.id;
    const input_pw = req.body.pw;
    // const token = crypto.randomUUID();
    if (dbdata[input_id] == "undefined") {
        console.log(dbdata[input_id],"is undefined");
        return res.send({"text":"login failed"});
    }
    if (dbdata[input_id].pw === input_pw) {
        console.log("login success");
        const token = crypto.randomUUID();
        // res.render('index.ejs', { csrfToken: "token111" });
        res.cookie("user_id", input_id ,{
            // secure: true,
            sameSite: true,
            httpOnly: true,
            expires: expiryDate
        });
        res.cookie("token", token ,{
            // secure: true,
            sameSite: true,
            httpOnly: true,
            expires: expiryDate
        });
        return res.send({"text":"login success:"+input_id,"token":token});
    }else{
        console.log(dbdata[input_id].pw,input_pw,"unmatch");
        // return res.send("login failed");
    }
});

app.post('/secret', function(req, res) {
    const input_id = req.body.id;
    const hidden_token = req.body.token;
    // const token = crypto.randomUUID();
    console.log(hidden_token);
    if (typeof dbdata[input_id] === "undefined") {
        return res.send({"text":"login failed"});
    }
    if (dbdata[input_id].token === hidden_token) {
        return res.send({"text":"login success:"+input_id,"token":hidden_token});
    }else{
        return res.send("login failed");
    }
});

app.get('/cookie', function(req, res) {
    res.cookie('login_user', '1', {
        httpOnly: true,
        secure: true
    });
    res.cookie('token', 'regerbfds3refws', {
        httpOnly: true,
        secure: true
    });
    res.json();
});


// create-userの設定
app.post('/api/v1/create-user', (req, res) =>{
    if (!req.body){
        return res.status(500).send('reqest body empty.');
    }

    const instance = new User();
    instance.name = req.body.name;
    instance.age = req.body.age;
    // MongoDBに保存
    instance.save(function(err){
        if(!err) {
            return res.status(200).send('user create success.');
        } else {
            return res.status(500).send('user create faild.');
        }
    });
});

// get-all-userの設定
app.get('/api/v1/get-all-user', (req, res) =>{
    UserModel.find(function(err, result){
        if(!err) {
            return res.json(result);
        } else {
            return res.status(500).send('get all user faild.');
        }
    });
});

//仮DB
function setTokenAtDb(user_id,token) {
    
}

let dbdata = {};
dbdata.a = {};
dbdata.a.pw = "1";
dbdata.a.token = "dddd-ssss";

app.listen(PORT, HOST);

console.log(`Running on http://${HOST}:${PORT}`);